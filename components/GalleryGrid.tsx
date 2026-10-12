"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Expand, X } from "lucide-react";
import { gallery } from "@/lib/data";

export function GalleryGrid() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement | null>(null);
  const [selected, setSelected] = useState(0);
  const photo = gallery[selected];
  return <>
    <div className="gallery-grid">{gallery.map((item, index) => <figure key={item.src}>
      <a href={item.src} aria-label={`Enlarge ${item.title.toLowerCase()}`} onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.current?.showModal) return;
        event.preventDefault();
        trigger.current = event.currentTarget;
        setSelected(index);
        dialog.current.showModal();
      }}><Image src={item.src} alt={item.alt} width={1400} height={933} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1199px) 44vw, 30vw" /><span className="zoom-label"><Expand size={18} aria-hidden="true" /></span><span className="gallery-caption"><h3>{item.title}</h3></span></a>
    </figure>)}</div>
    <dialog ref={dialog} className="lightbox" aria-labelledby="lightbox-title" onClose={() => trigger.current?.focus()} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="lightbox-bar"><h2 id="lightbox-title">{photo.title}</h2><button type="button" aria-label="Close photograph" onClick={() => dialog.current?.close()} autoFocus><X size={22} aria-hidden="true" /></button></div>
      <Image src={photo.src} alt={photo.alt} width={1400} height={933} sizes="900px" />
    </dialog>
  </>;
}
