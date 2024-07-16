import React from 'react'
import { Button } from './ui/Button'
import { Download } from 'lucide-react'
import html2canvas from "html2canvas"

const ExportToPNGButton = ({ exportRef }: { exportRef: React.RefObject<HTMLElement> }) => {

    const downloadImg = () => {
        const el = exportRef.current
        html2canvas(el).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            console.log(imgData)
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'screenshot.png'; // Name of the downloaded file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
    }

    return (
        <Button variant={'outline'} size='icon' className='shrink-0' onClick={downloadImg}>
            <Download size={18} />
        </Button>
    )
}

export default ExportToPNGButton