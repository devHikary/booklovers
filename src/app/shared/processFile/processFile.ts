export class ProcessFile{


  public static converterBlobtoImg(b64Data: Blob, contentType:string = "image/png"): string{
    const blob = this.b64toBlob(b64Data, contentType);
    const blobUrl = URL.createObjectURL(blob);

      return blobUrl;
  }

  public static b64toBlob(b64Data: any, contentType = '', sliceSize = 512){
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };
}
