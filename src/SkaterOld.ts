class Skater extends HTMLElement {
    private _name: string
    // private x: number
    // private y: number
    private _color: string
    private _startPoint: number
    // private element: HTMLElement
    private _scale: number
    private _path : SVGPathElement
    private _procent: number
    private _speed: number = 0.1
    private _outerLane: boolean = false
    private _boost : number = 0
    private _stamina: number = 100
    private _lapsToGo: number = LAPS_TO_GO
    private _startTime: number
    private _finishTime: number = 0

    constructor(name: string, color: string, startPoint: number, scale: number, path: SVGPathElement) {
        super()

        this._name = name

        this._color = color
        this._startPoint = startPoint
        this._scale = scale
        this._path = path
        this._procent = this._startPoint
        this._startTime = new Date().getTime()

        this.style.backgroundColor = this._color
        this.style.height = 150 / this._scale + "px"
        this.style.width = 150 / this._scale + "px"

        document.body.appendChild(this)
        this.moveObject(this._startPoint)
    }

    public get procent(): number {return this._procent}
    public set procent(value: number) {this._procent = value}

    public get boost(): number {return this._boost}
    public set boost(value: number) {if (this._boost < 0.15 && this._stamina > 0) this._boost = value}

    public get stamina(): number {return this._stamina}

    private isInOuterLane(procent: number): boolean {

        if(procent > 19 && procent < 67.1) {
            return false
        } else {
            return true
        }

    }

    private isOnFinishline(procent: number): boolean {

        if(procent >= 87 && procent < 87 + this._speed ||
            procent >= 37 && procent < 37 + this._speed) {
                return true
            } else {
                return false
            }

    }

    private calculatePathPoint(procent: number): number {

        return Math.floor(this._path.getTotalLength()) / (100 / procent)

    }


    public moveObject(procent: number, path: SVGPathElement = this._path) {

        if (this._stamina >= 0 && this._lapsToGo > 0) {
            this._stamina -= STAMINA_DRAINAGE + ( this._boost > 0 ? this._boost * SKATER_LEVEL : 0 )
        } else {
            this._speed = 0
            this._boost = 0
        }

        if (procent > 0) {
            procent -= (this._speed + this._boost)
        } else {
            procent = 100
        }

        this._outerLane = this.isInOuterLane(procent)

        this._procent = procent

        let pt = path.getPointAtLength(this.calculatePathPoint(procent))

        pt.x = Math.round(pt.x)
        pt.y = Math.round(pt.y)

        if (this.isOnFinishline(procent)) {
            this._lapsToGo -= 1
        } else {
            console.log(this._lapsToGo)
        }

        if (this._lapsToGo === 0) {
            if(this._finishTime == 0) {
                this._finishTime = new Date().getTime()
            }

            let distanceTime = this._finishTime - this._startTime
            console.log(new Date(distanceTime).getMinutes() + "." + new Date(distanceTime).getSeconds() + "," + new Date(distanceTime).getMilliseconds())
        }
        
        this.style.transform = 'translate3d('+ 
            (( pt.x  / this._scale ) - (this.clientHeight / 2)) +'px,' + 
            (( pt.y  / this._scale ) - (this.clientHeight / 2)) +'px, 0)'
    }
}

const SKATER_LEVEL = 3 //boost speed
const STAMINA_DRAINAGE = 0.04
const LAPS_TO_GO = 4

window.customElements.define("skater-element", Skater as any)