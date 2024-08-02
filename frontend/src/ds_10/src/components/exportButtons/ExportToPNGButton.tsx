import React from 'react'
import { Download } from 'lucide-react'
import html2canvas from "html2canvas"

const ExportToPNGButton = ({ exportRef }: { exportRef: React.RefObject<HTMLElement> }) => {

    const downloadImg = () => {
        const el = exportRef.current

        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');

        html2canvas(el).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const link = document.createElement('a');
            link.href = imgData
            link.download = 'screenshot.png'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            style.remove()
        })
    }

    return (
        <div className='size-[1.6rem] p-1 shrink-0 rounded border bg-white hover:accent transition-all cursor-pointer'>
            <Download className='w-full h-full' onClick={downloadImg} />
        </div>
    )
}

export default ExportToPNGButton