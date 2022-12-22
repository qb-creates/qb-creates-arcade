import { GameObject, Vector2, Component, Transform, Canvas, MonoBehaviour, SpriteRenderer } from "./qbcreates-js-engine";
import { Guid } from "guid-typescript";
import { ComponentInterface } from "./component-interface";

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
     * Clones the object original and returns the clone.
     * @param {Prefab} originalGameObject - An existing prefab that you want to make a copy of.
     * @returns {GameObject} - Returns the newly created gameObject.
     */
    static instantiate(originalGameObject: Prefab): GameObject;

    /**
     * Clones the object original and returns the clone.
     * @param {GameObject} originalGameObject - An existing object that you want to make a copy of.
     * @returns {GameObject} - Returns the newly created gameObject.
     */
    static instantiate(originalGameObject: GameObject): GameObject;

    /**
     * Clones the object original and returns the clone.
     * @param originalGameObject - An existing object that you want to make a copy of.
     * @param parent - Parent that will be assigned to the new object.
     * @param position - Position for the new object.
     */
    static instantiate(originalGameObject: GameObject, parent: GameObject, position: Vector2): GameObject;

    /**
     * Clones the object original and returns the clone.
     * @param originalGameObject - An existing object that you want to make a copy of.
     * @param parent - Parent that will be assigned to the new object.
     * @param position - Position for the new object.
     */
    static instantiate(originalGameObject: Prefab | GameObject, parent?: GameObject, position?: Vector2): GameObject {
        if (originalGameObject instanceof GameObject) {
            return QObject.instantiateGameObject(originalGameObject as GameObject, parent, position);
        } else if (QObject.isPrefab(originalGameObject)) {
            return QObject.instantiatePrefabObject(originalGameObject as Prefab);
        }
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

    private static instantiateGameObject(originalGameObject: GameObject, parent: GameObject = null, position: Vector2 = new Vector2(0, 0)) {
        // let underscorIndex = originalGameObject.objectName.lastIndexOf('_');
        // let newName = originalGameObject.objectName + '_1';

        // if (underscorIndex != -1) {
        //     cloneNumber = '_' + Number(originalGameObject.objectName.substring(underscorIndex + 1)) + 1;
        //     newName = originalGameObject.objectName.
        //     let a ='sdf'
        //     a.
        // }

        // Create the new GameObject.
        let clonedObject = new GameObject(originalGameObject.objectName);
        clonedObject.layer = originalGameObject.layer;
        clonedObject.transform.position = new Vector2(originalGameObject.transform.position.x, originalGameObject.transform.position.y);
        clonedObject.transform.scale = new Vector2(originalGameObject.transform.scale.x, originalGameObject.transform.scale.y);
        
        // Recursively create new instances of the children GameObjects
        originalGameObject.children.forEach(child => {
            QObject.instantiateGameObject(child, clonedObject);
        });

        // Recursively create the components and add them to the current GameObject.
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

        // Add to the parent if it is not null
        if (parent) {
            parent.addGameObject(clonedObject);
        }

        // Set the position if it is not null
        if (position) {
            clonedObject.transform.position = position;
        }

        // Add the gameObject to the canvas to be rendered.
        Canvas.addGameObject(clonedObject);
        return clonedObject;
    }

    private static instantiatePrefabObject(prefab: Prefab) {
        // Create the new GameObject.
        let gameObject = new GameObject(prefab.objectName);
        gameObject.layer = prefab.layer;
        gameObject.transform.position = prefab.position;
        gameObject.transform.scale = prefab.scale;

        // Recursively create new instances of the children prefabs and push them into the parent GameObject
        prefab.children.forEach(childPrefab => {
            let child = QObject.instantiatePrefabObject(childPrefab);
            child.parent = gameObject;
            gameObject.children.push(child);
        });

        // Recursively create the components and add them to the current GameObject.
        prefab.components.forEach((componentPrefab: ComponentObject) => {
            // Get the component interface from the prefab.
            // let componentInterface = componentPrefab.returnInterface();

            // Create the component.
            let component = gameObject.addComponent(componentPrefab.component);

            // Copy property values from the component interface over to the component.
            // for (var key in componentInterface.properties) {
            //     if (gameObject[key] != 'undefined') {
            //         Reflect.set(component, key, componentInterface.properties[key])
            //     }
            // }
            Object.assign(component, componentPrefab.properties)
        });

        // Add the gameObject to the canvas to be rendered.
        Canvas.addGameObject(gameObject);
        return gameObject;
    }

    private static isPrefab(object: Prefab) {
        return (object as Prefab).children !== undefined
            && (object as Prefab).layer !== undefined
            && (object as Prefab).components !== undefined
            && (object as Prefab).objectName !== undefined;
    }
}

/**
 * 
 */
export interface Prefab {
    children: Prefab[],
    layer: number,
    objectName: string,
    position: Vector2,
    scale: Vector2,
    components: ComponentObject[]
}

/**
 * 
 */
export interface ComponentObject {
    component: typeof Component,
    properties: ComponentInterface
}
