import View from './View.js'

const tag = '[FormView]'

const FormView = Object.create(View)

FormView.setup = function (el) {
  this.init(el)
  this.inputEl = el.querySelector('[type=text]')
  this.resetEl = el.querySelector('[type=reset')
  this.showResetBtn(false) //초기 초기화값 설정
  this.bindEvents() //이벤트 바인딩
  return this
}

FormView.showResetBtn = function (show = true) { //초기화 버튼 셋팅
  this.resetEl.style.display = show ? 'block' : 'none'
}

FormView.bindEvents = function() {
  this.on('submit', e => e.preventDefault())
  this.inputEl.addEventListener('keyup', e => this.onKeyup(e)) //검색폼에 이벤트 추가
  this.resetEl.addEventListener('click', e => this.onClickReset()) //초기화버튼에 이벤트 추가
}

FormView.onKeyup = function (e) {
  const enter = 13
  this.showResetBtn(this.inputEl.value.length) //검색폼에 입력값 여부 체크
  if (!this.inputEl.value.length) this.emit('@reset') //키보드로 입력값 전부 지웠을때 maincontroller에 전달
  if (e.keyCode !== enter) return 
  this.emit('@submit', {input: this.inputEl.value}) //엔터 시 입력값 maincontroller에 전달
}

FormView.onClickReset = function() {
  this.emit('@reset') //maincontroller에 전달
  this.showResetBtn(false) //초기화버튼 hidden
}

FormView.setValue = function (value = '') {
  this.inputEl.value = value
  this.showResetBtn(this.inputEl.value.length)
}

export default FormView