"use client"

import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill";

interface EditorProps {
  onChange: (value: string) => void
  value: string
}

export const Editor = ({onChange, value}: EditorProps) => {
  // const ReactQuill = useMemo(() => dynamic(() => import("react-quill")), [])

  return (
      <div className={"bg-white"}>
        <ReactQuill
            theme={"snow"}
            value={value}
            onChange={onChange}
        />
      </div>
  )
}