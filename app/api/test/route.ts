import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) {
      return NextResponse.json(
        { error: 'ファイルが見つかりません' },
        { status: 400 }
      )
    }

    // ここでファイルの処理を行います
    // 例：ファイル名とサイズを確認
    console.log('ファイル名:', file.name)
    console.log('ファイルサイズ:', file.size)

    // 実際のアプリケーションでは、ここでファイルを保存したり
    // クラウドストレージにアップロードしたりします

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('エラー:', error)
    return NextResponse.json(
      { error: 'アップロード中にエラーが発生しました' },
      { status: 500 }
    )
  }
}
