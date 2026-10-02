import { useRef, useState } from 'react'

const GRID_SIZE = 30
const CANVAS_SIZE = 1200
const CELL_SIZE = CANVAS_SIZE / GRID_SIZE

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image()

        image.onload = () => resolve(image)

        image.onerror = () => reject(
            new Error(`Failed to load image: ${src}`)
        )

        image.src = src
    })
}

function getAverageColor(data, startX, startY) {

    let red = 0
    let green = 0
    let blue = 0
    let count = 0

    for (let y = 0; y < CELL_SIZE; y++) {

        for (let x = 0; x < CELL_SIZE; x++) {

            const index =
                ((startY + y) * CANVAS_SIZE + (startX + x)) * 4

            const alpha = data[index + 3]

            if (alpha === 0) {
                continue
            }

            red += data[index]
            green += data[index + 1]
            blue += data[index + 2]

            count++
        }
    }

    if (count === 0) {
        return {
            r: 0,
            g: 0,
            b: 0
        }
    }

    return {
        r: red / count,
        g: green / count,
        b: blue / count
    }
}

function colorizeImage(imageData, color) {

    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {

        const red = data[i]
        const green = data[i + 1]
        const blue = data[i + 2]

        const brightness =
            (
                0.299 * red +
                0.587 * green +
                0.114 * blue
            ) / 255

        data[i] =
            color.r * brightness

        data[i + 1] =
            color.g * brightness

        data[i + 2] =
            color.b * brightness
    }

    return imageData
}

function CreativeCode() {

    const fileInputRef = useRef(null)
    const canvasRef = useRef(null)

    const [mosaicReady, setMosaicReady] = useState(false)

    async function handleImageUpload(event) {

        const file = event.target.files[0]

        if (!file) {
            return
        }

        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/webp'
        ]

        if (!allowedTypes.includes(file.type)) {
            setMosaicReady(false)
            event.target.value = ''
            return
        }

        const imageUrl = URL.createObjectURL(file)

        setMosaicReady(false)

        try {
            await createMosaic(imageUrl)
        } catch (error) {
            console.error(error)
        } finally {
            URL.revokeObjectURL(imageUrl)
        }
    }

    async function createMosaic(imageUrl) {

        const uploadedImage =
            await loadImage(imageUrl)

        const faceImage =
            await loadImage('/media/cute_lil_face.png')

        /*
         * Canvas della faccia originale.
         */

        const faceCanvas =
            document.createElement('canvas')

        const faceCtx =
            faceCanvas.getContext(
                '2d',
                { willReadFrequently: true }
            )

        faceCanvas.width = CANVAS_SIZE
        faceCanvas.height = CANVAS_SIZE

        faceCtx.drawImage(
            faceImage,
            0,
            0,
            CANVAS_SIZE,
            CANVAS_SIZE
        )

        /*
         * Leggiamo i pixel della faccia.
         */

        const faceData =
            faceCtx.getImageData(
                0,
                0,
                CANVAS_SIZE,
                CANVAS_SIZE
            )

        /*
         * Creiamo una singola tile 40x40
         * partendo dalla foto caricata.
         */

        const tileCanvas =
            document.createElement('canvas')

        const tileCtx =
            tileCanvas.getContext(
                '2d',
                { willReadFrequently: true }
            )

        tileCanvas.width = CELL_SIZE
        tileCanvas.height = CELL_SIZE

        tileCtx.imageSmoothingEnabled = true
        tileCtx.imageSmoothingQuality = 'high'

        /*
         * Crop centrale quadrato della foto.
         */

        const size =
            Math.min(
                uploadedImage.naturalWidth,
                uploadedImage.naturalHeight
            )

        const sourceX =
            (uploadedImage.naturalWidth - size) / 2

        const sourceY =
            (uploadedImage.naturalHeight - size) / 2

        tileCtx.drawImage(
            uploadedImage,
            sourceX,
            sourceY,
            size,
            size,
            0,
            0,
            CELL_SIZE,
            CELL_SIZE
        )

        /*
         * Conserviamo la tile originale.
         */

        const originalTileData =
            tileCtx.getImageData(
                0,
                0,
                CELL_SIZE,
                CELL_SIZE
            )

        /*
         * Canvas finale.
         */

        const canvas =
            canvasRef.current

        const ctx =
            canvas.getContext('2d')

        canvas.width = CANVAS_SIZE
        canvas.height = CANVAS_SIZE

        ctx.clearRect(
            0,
            0,
            CANVAS_SIZE,
            CANVAS_SIZE
        )

        /*
         * Creiamo le 900 celle della griglia.
         */

        for (let row = 0; row < GRID_SIZE; row++) {

            for (
                let column = 0;
                column < GRID_SIZE;
                column++
            ) {

                const x =
                    column * CELL_SIZE

                const y =
                    row * CELL_SIZE

                /*
                 * Colore medio della corrispondente
                 * cella della faccia.
                 */

                const averageColor =
                    getAverageColor(
                        faceData.data,
                        x,
                        y
                    )

                /*
                 * Creiamo una copia indipendente
                 * della foto.
                 */

                const tileData =
                    new ImageData(
                        new Uint8ClampedArray(
                            originalTileData.data
                        ),
                        CELL_SIZE,
                        CELL_SIZE
                    )

                /*
                 * Ricoloriamo la copia.
                 */

                colorizeImage(
                    tileData,
                    averageColor
                )

                /*
                 * Posizioniamo la tile nella griglia.
                 */

                ctx.putImageData(
                    tileData,
                    x,
                    y
                )
            }
        }

        /*
         * Il mosaico è stato completato.
         */

        setMosaicReady(true)
    }

    function handleUploadClick() {
        fileInputRef.current.click()
    }

    return (
        <section
            id="creative-code-diy"
            className="creative-code"
        >

            <div className="creative-code-intro">

                <h2>Creative Code DIY</h2>

                {!mosaicReady ? (
                    <p>
                        upload an image and see what happens.
                    </p>
                ) : (
                    <p>
                        ecco, this is my cute lil face made from a mosaic of the photo you&apos;ve uploaded.
                        i make these little codes when i get bored, so here we are.
                        if you hire me, you&apos;ll get to work with this pretty face.
                        feel free to try it with other images too, and zoom in if you want to see the details.
                    </p>
                )}

            </div>

            <div className="creative-code-tool">

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleImageUpload}
                    hidden
                />

                <button
                    className="creative-code-upload"
                    onClick={handleUploadClick}
                >
                    UPLOAD IMAGE
                </button>

                <canvas
                    ref={canvasRef}
                    className="creative-code-canvas"
                />

            </div>

        </section>
    )
}

export default CreativeCode