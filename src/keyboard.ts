/**
 * 키보드 이벤트로 입력받은 문자 값
 * @param e 키보드 이벤트
 * @returns string
 */
export function getKeyLowercaseByEvent(e: KeyboardEvent): string {
    return (e.key !== undefined) ? e.key.toLowerCase() : ((e.keyCode !== undefined) ? String.fromCharCode(e.keyCode).toLowerCase() : '')
}

/**
 * 키보드로 입력한 값이 알파벳 또는 소문자인지 여부. 
 * 빠르게 체크를 해야하는 부분이므로, 코드의 시인성보다 성능상의 최적화에 중점을 둘 것.
 * @param e 키보드 이벤트
 * @returns boolean
 */
 export function isAlphaNumericByEvent(e: KeyboardEvent): boolean {
    if (e.key !== undefined) {
        // key값(예:a~z,0~9,Alt,Control)에서 영문,숫자 입력만 필터링
        if(e.key.length != 1) return false
        // key값(예:a~z,0~9)의 첫글자만 소문자화
        let _code = (e.key).toLowerCase().charCodeAt(0)
        return (_code >= 'a'.charCodeAt(0) && _code <= 'z'.charCodeAt(0)) || (_code >= '0'.charCodeAt(0) && _code <= '9'.charCodeAt(0))
    } else if (e.keyCode !== undefined) {
        // e.keyCode는 대문자로 값이 들어옴.
        // A~Z는 코드로 65~90
        // 0~9는 코드로 48~57, 숫자패드 0~9는 96~105
        return (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)
    }
    return false
}