"use client";
import Icon from "@/app/global/components/Icon";
import { useState, useEffect, useRef } from "react";

type Props = { onSelect: (file: File | null) => void };

// Parent remounts this (key) after a successful submit to clear it
export default function CarImage({ onSelect }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function select(file: File | null) {
    onSelect(file);                                          // giv filen op til formularen
    setFileName(file?.name ?? null);
    setPreview(file ? URL.createObjectURL(file) : null);     // lokal forhåndsvisning
  }

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  return (
    <div className="flex flex-col gap-6">
      <span id="car-image-label" className="font-bold text-sm uppercase tracking-[0.03em]">
        Billede <span className="font-medium normal-case tracking-normal text-grey-200">(valgfrit)</span>
      </span>

      <label
        htmlFor="car_image"
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file && file.type.startsWith("image/")) select(file);
        }}
        className={`relative flex flex-col items-center justify-center gap-8 overflow-hidden rounded-4 border-2 border-dashed text-center cursor-pointer
          has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-primary-600 has-[:focus-visible]:outline-offset-2
          ${preview ? "aspect-image border-transparent" : "min-h-[10rem] p-24"}
          ${dragOver ? "border-primary-600 bg-primary-100" : "border-primary-200 bg-primary-50 hover:border-primary-400"}`}
      >
        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
            <img src={preview} alt="Forhåndsvisning af billedet" className="absolute inset-0 w-full h-full object-cover" />
            <span className="absolute bottom-8 right-8 inline-flex items-center gap-6 rounded-2 bg-bg-dark/85 text-white px-12 py-8 text-sm font-bold uppercase">
              <Icon iconName="pencil" size="xs" /> Skift billede
            </span>
          </>
        ) : (
          <>
            <span className="grid place-items-center w-48 h-48 rounded-full bg-white text-primary-800">
              <Icon iconName="upload" />
            </span>
            <span className="font-bold uppercase text-primary-800">Upload billede</span>
            <span className="text-sm text-grey-200">Træk et billede hertil eller tryk for at vælge</span>
          </>
        )}
        <input
          ref={inputRef}
          id="car_image"
          name="car_image"
          type="file"
          accept="image/*"
          aria-describedby="car-image-label"
          onChange={(e) => select(e.target.files?.[0] ?? null)}
          className="sr-only"
        />
      </label>

      {fileName && (
        <div className="flex items-center justify-between gap-8 text-sm">
          <span className="truncate text-grey-200">{fileName}</span>
          <button
            type="button"
            onClick={() => {
              select(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="shrink-0 min-h-40 px-8 font-bold uppercase text-danger-text hover:underline"
          >
            Fjern
          </button>
        </div>
      )}
    </div>
  );
}
