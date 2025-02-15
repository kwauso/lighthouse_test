'use client'
import { useState } from 'react'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const API_KEY = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY || ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('https://node.lighthouse.storage/api/v0/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        console.log('アップロード成功:', data)
        alert(`アップロード成功！\nCID: ${data.Hash}`)
      } else {
        alert('アップロードに失敗しました')
      }
    } catch (error) {
      console.error('エラー:', error)
      alert('アップロードに失敗しました')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={!file}
        >
          Lighthouseにアップロード
        </button>
      </form>
    </main>
  )
}
