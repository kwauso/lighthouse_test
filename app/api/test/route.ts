import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as Blob
    
    if (!file) {
      return NextResponse.json(
        { error: 'ファイルが見つかりません' },
        { status: 400 }
      )
    }

    // 直接Bufferに変換
    const buffer = Buffer.from(await file.arrayBuffer())
    
    console.log('バッファーサイズ:', buffer.length)
    // ここでbufferを使用してファイルの処理が可能です
    
    return NextResponse.json({ 
      success: true,
      size: buffer.length
    })
  } catch (error) {
    console.error('エラー:', error)
    return NextResponse.json(
      { error: 'アップロード中にエラーが発生しました' },
      { status: 500 }
    )
  }
}
