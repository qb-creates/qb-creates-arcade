import { Sprite } from "./sprite"
import { SpriteShape } from "./sprite-shape"
import { SpriteSheet } from "./sprite-sheet"
import { Vector2 } from "./vector2"

export interface ComponentInterface {}

export interface SpriteRendererInterface extends ComponentInterface{
    color: string,
    sprite: SpriteShape | Sprite | SpriteSheet
}

export interface BoxColliderInterface extends ComponentInterface{
    position: Vector2,
    scale: Vector2
}

export interface ButtonInterface extends ComponentInterface{
    text: string,
    textColor: string,
    textSize: number,
    font: string,
    bold: boolean,
    buttonColor: string
}

export interface LabelInterface extends ComponentInterface{
    text: string,
    textColor: string,
    textSize: number,
    font: string,
    bold: boolean,
}