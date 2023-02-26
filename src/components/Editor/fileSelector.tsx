import React, { useEffect, useRef, useState } from 'react'
import './fileSelector.scss'

import { IEditorProps } from './types'

function FileSelector(props: IEditorProps) {
  const { fileTitle } = props

  const pendingFileDom = useRef<null | HTMLDivElement>(null)

  // 文件队列
  const [files, useFiles] = useState(['main.c'])

  const importMapFile = 'other.c'

  // 新增文件
  const [pendingFilename, usePendingFilename] = useState('comp.c')
  const [pending, usePending] = useState(false)
  const [activeFile, useActive] = useState('main.c')

  useEffect(() => {
    if (pending === true) {
      focus()
    }
  }, [pending])

  const startAddFile = () => {
    let i = 0
    let name = `comp.c`

    while (true) {
      let hasConflict = false
      for (const file of files) {
        if (file === name) {
          name = `comp${++i}.c`
          break
        }
      }
      if (!hasConflict) {
        break
      }
    }

    usePendingFilename(name)
    usePending(true)
  }

  const cancelAddFile = () => {
    usePending(false)
  }

  const doneAddFile = () => {
    if (!pending) return

    const filename = pendingFilename

    if (!/\.(python|java|js|c)$/.test(filename)) {
      console.warn(`Playground only supports *.python, *.java, *.js, *.c files.`)
      return
    }

    if (files.includes(filename)) {
      console.warn(`File "${filename}" already exists.`)
      return
    }

    cancelAddFile()
    useFiles([...files, filename])
    useActive(filename)
  }

  const deleteFile: (e: React.MouseEvent<HTMLSpanElement>, filename: string, k: number) => void = (e, filename, k) => {
    e.stopPropagation()

    if (confirm(`Are you sure you want to delete ${filename}?`)) {
      if (activeFile === filename) {
        useActive(files[0])
      }

      const newFiles = [...files]
      newFiles.splice(k, 1)
      useFiles(newFiles)
    }
  }

  const focus = () => {
    const focusDom = Array.from(pendingFileDom.current?.childNodes!)
    ;((focusDom[focusDom.length - 3] as HTMLDivElement).children[0] as HTMLInputElement).focus()
  }

  return (
    <div className="file-selector" ref={pendingFileDom}>
      {files.map((file, k) => {
        return (
          <div key={file} className={`file ${activeFile === file ? 'active' : ''}`} onClick={() => useActive(files[k])}>
            <span className="label">{file === importMapFile ? 'Import Map' : file}</span>
            {k > 0 ? (
              <span className="remove" onClick={(e) => deleteFile(e, file, k)}>
                <svg className="icon" width="12" height="12" viewBox="0 0 24 24">
                  <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                  <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
            ) : (
              <></>
            )}
          </div>
        )
      })}
      
      {pending ? (
        <div className="file pending">
          <input
            defaultValue={pendingFilename}
            spellCheck="false"
            onChange={(e) => {
              usePendingFilename(e.target.value)
            }}
            onBlur={(_) => {
              doneAddFile()
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') doneAddFile()
              else if (e.key === 'Escape') cancelAddFile()
            }}
          />
        </div>
      ) : (
        <></>
      )}

      <button className="add" onClick={startAddFile}>
        +
      </button>

      <div className="import-map-wrapper">
        <div className="file import-map">
          <span className="label">{fileTitle}</span>
        </div>
      </div>
    </div>
  )
}

export default FileSelector
