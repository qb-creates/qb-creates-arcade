import { GameObject, Vector2, Component, Transform, Canvas, MonoBehaviour } from "./qbcreates-js-engine";
import { Guid } from "guid-typescript";

export class QObject {
    private _metaData: Guid = null;
    private static _propertyExclusionList: string[] = [
        '_gameObject',
        '_metaData',
        '_transform',
        '_previousListCount',
        '_render',
        '_collisionList',
        '_canvasUpdateSubscription',
        '_fixedUpdateInterval'
    ];

    get metaData() {
        return this._metaData;
    }

    constructor() {
        this._metaData = Guid.create();
    }

    /**
     * Clones the original gameObject and returns the clone
     * @param {GameObject} originalGameObject - GameObject that will be cloned.
     * @param {GameObject} parent - The gameObject the cloned object will become a child of.
     * @param {Vector2} position - Starting position of the cloned object.
     * @returns 
     */
    static instantiate(originalGameObject: GameObject, parent: GameObject = null, position: Vector2 = new Vector2(0, 0)) {
        // let underscorIndex = originalGameObject.objectName.lastIndexOf('_');
        // let newName = originalGameObject.objectName + '_1';

        // if (underscorIndex != -1) {
        //     cloneNumber = '_' + Number(originalGameObject.objectName.substring(underscorIndex + 1)) + 1;
        //     newName = originalGameObject.objectName.
        //     let a ='sdf'
        //     a.
        // }
        let clonedObject = new GameObject(originalGameObject.objectName);

        clonedObject.layer = originalGameObject.layer;
        clonedObject.transform.position = new Vector2(originalGameObject.transform.position.x, originalGameObject.transform.position.y);
        clonedObject.transform.scale = new Vector2(originalGameObject.transform.scale.x, originalGameObject.transform.scale.y);

        originalGameObject.children.forEach(child => {
            QObject.instantiate(child, clonedObject);
        });

        originalGameObject.getComponents(Component).forEach(script => {
            if (!(script instanceof Transform)) {

                let clonedScript = clonedObject.addComponent(script.constructor);
                let propertyDescriptors = Object.getOwnPropertyDescriptors(script);

                Object.entries(propertyDescriptors).forEach(descriptor => {
                    let key = descriptor[0];
                    let value = descriptor[1].value;
                    if (!QObject._propertyExclusionList.includes(key)) {
                        Reflect.set(clonedScript, key, value)
                    }
                })
            }
        });

        if (parent) {
            if (parent instanceof GameObject) {
                parent.addGameObject(clonedObject);
            } else {
                throw new Error(`Error instantiating ${typeof (originalGameObject.objectName)}. ${parent} is not of type gameObject.`)
            }
        }

        if (position) {
            clonedObject.transform.position = position;
        }

        Canvas.addGameObject(clonedObject);
        return clonedObject;
    }

    /**
     * Creates an instance of a prefabe object.
     * @param {*} prefab - The prefab object that we want to create.
     * @returns 
     */
    static instantiatePrefabObject(prefab) {
        let gameObject = new GameObject(prefab.objectName);
        gameObject.layer = prefab.layer;
        gameObject.transform.position = prefab.position;
        gameObject.transform.scale = prefab.scale;

        prefab.children.forEach(childPrefab => {
            let child = QObject.instantiatePrefabObject(childPrefab);
            child.parent = gameObject;
            gameObject.children.push(child);
        });

        prefab.components.forEach(componentPrefab => {
            let component = gameObject.addComponent(componentPrefab.component);

            for (var key in componentPrefab.properties) {
                if (gameObject[key] != 'undefined') {
                    Reflect.set(component, key, componentPrefab.properties[key])
                }
            }
        });

        Canvas.addGameObject(gameObject);
        return gameObject;
    }

    /**
     * Removes a gameObject component
     * @param {GameObject} gameObject - The gameObject that will be removed.
     */
    static destroy(gameObject: GameObject) {
        Canvas.removeGameObject(gameObject);
        gameObject.getComponents(MonoBehaviour).forEach(component => {
            component.destroy();
        });
        gameObject.destroy();
    }
}