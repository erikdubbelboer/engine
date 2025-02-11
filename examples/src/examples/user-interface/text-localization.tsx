import React from 'react';
import * as pc from '../../../../';

import { AssetLoader } from '../../app/helpers/loader';

class TextLocalizationExample {
    static CATEGORY = 'User Interface';
    static NAME = 'Text Localization';

    load() {
        return <>
            <AssetLoader name='font' type='font' url='/static/assets/fonts/courier.json' />
        </>;
    }

    example(canvas: HTMLCanvasElement, assets: { font: pc.Asset }): void {

        // Create the application with input and start the update loop
        const app = new pc.Application(canvas, {
            mouse: new pc.Mouse(document.body),
            touch: new pc.TouchDevice(document.body),
            elementInput: new pc.ElementInput(canvas)
        });
        app.start();

        app.i18n.addData({
            header: {
                version: 1
            },
            data: [{
                info: {
                    locale: 'en-US'
                },
                messages: {
                    "HELLO": "Hi"
                }
            }, {
                info: {
                    locale: 'fr-FR'
                },
                messages: {
                    "HELLO": "Salut"
                }
            }, {
                info: {
                    locale: 'es-ES'
                },
                messages: {
                    "HELLO": "Hola"
                }
            }, {
                info: {
                    locale: 'pt-BR'
                },
                messages: {
                    "HELLO": "Oi!"
                }
            }]
        });

        // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
        app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
        app.setCanvasResolution(pc.RESOLUTION_AUTO);

        window.addEventListener("resize", function () {
            app.resizeCanvas(canvas.width, canvas.height);
        });

        // Create a camera
        const camera = new pc.Entity();
        camera.addComponent("camera", {
            clearColor: new pc.Color(30 / 255, 30 / 255, 30 / 255)
        });
        app.root.addChild(camera);

        // Create a 2D screen
        const screen = new pc.Entity();
        screen.addComponent("screen", {
            referenceResolution: new pc.Vec2(1280, 720),
            scaleBlend: 0.5,
            scaleMode: pc.SCALEMODE_BLEND,
            screenSpace: true
        });
        app.root.addChild(screen);

        // Create a basic text element
        const text = new pc.Entity();
        text.addComponent("element", {
            anchor: [0.5, 0.5, 0.5, 0.5],
            autoWidth: false,
            fontAsset: assets.font.id,
            fontSize: 128,
            pivot: [0.5, 0.5],
            key: "HELLO",
            type: pc.ELEMENTTYPE_TEXT,
            width: 640
        });
        screen.addChild(text);

        function createButton(labelText: string, x: number, y: number) {
            // Create a simple button
            const button = new pc.Entity();
            button.addComponent("button", {
                imageEntity: button
            });
            button.addComponent("element", {
                anchor: [0.5, 0.5, 0.5, 0.5],
                height: 40,
                pivot: [0.5, 0.5],
                type: pc.ELEMENTTYPE_IMAGE,
                width: 128,
                useInput: true
            });

            // Create a label for the button
            const label = new pc.Entity();
            label.addComponent("element", {
                anchor: [0.5, 0.5, 0.5, 0.5],
                color: new pc.Color(0, 0, 0),
                fontAsset: assets.font.id,
                fontSize: 32,
                height: 64,
                pivot: [0.5, 0.5],
                text: labelText,
                type: pc.ELEMENTTYPE_TEXT,
                width: 128,
                wrapLines: true
            });
            button.addChild(label);

            // Change the locale to the button text
            button.button.on('click', function (e) {
                app.i18n.locale = labelText;
            });

            button.setLocalPosition(x, y, 0);

            return button;
        }

        screen.addChild(createButton("en-US", -225, -100));
        screen.addChild(createButton("fr-FR", -75, -100));
        screen.addChild(createButton("es-ES", 75, -100));
        screen.addChild(createButton("pt-BR", 225, -100));
    }
}

export default TextLocalizationExample;
