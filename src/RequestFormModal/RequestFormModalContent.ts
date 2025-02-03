export function getModalWrapperTemplate() {
  // Create modal dom nodes...
  const modalWrapperTemplate = `
<div
  id="RequestFormModal"
  class="RequestFormModal modal modal-backdrop Waiting with-error"
  tabindex="-1"
  role="dialog"
  aria-modal="true"
  aria-labelledby="RequestFormModalLabel"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title" id="RequestFormModalLabel">
          <span class="ShowForm">Отправить заявку</span>
          <span class="ShowMessage">Спасибо!</span>
        </h2>
        <button type="button" class="close CloseModal" data-dismiss="modal" aria-label="Закрыть">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="ShowForm EditForm">
          <p class="DullText">
            Отправьте онлайн-заявку на покупку недвижимости.
          </p>
          <form class="form FormContent">
            <small class="error form-error text-danger">Текст ошибки.</small>
            <div class="form-group with-error" id="name-group">
              <input name="name" id="name" class="form-control" placeholder="Имя *" type="text" data-required="true" value="Test with error" />
              <small class="error text-danger">Текст ошибки.</small>
            </div>
            <div class="form-group -with-error" id="email-group">
              <input name="email" id="email" class="form-control" placeholder="E-mail *" type="email" data-required="true" />
              <small class="error text-danger">Текст ошибки.</small>
            </div>
            <div class="form-group" id="phone-group">
              <input name="phone" id="phone" class="form-control" placeholder="Телефон *" type="phone" data-required="true" />
              <small class="error text-danger">Текст ошибки.</small>
            </div>
            <div class="form-group" id="comment-group">
              <textarea name="comment" id="comment" class="form-control" placeholder="Комментарий" rows="4"></textarea>
              <small class="error text-danger">Текст ошибки.</small>
            </div>
            <div class="form-group" id="comment-group">
              <div class="g-recaptcha"></div>
            </div>
          </form>
          <p class="DullText">
            Нажимая кнопку «Отправить заявку» вы соглашаетесь с политикой
            конфиденциальности и даёте согласие на обработку персональных
            данных.
          </p>
        </div>
        <div class="ShowMessage">
          Ваша заявка принята и будет обработана в ближайшее время, Вы получите уведомление на адрес электронной почты.
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary CloseModal" data-dismiss="modal">Закрыть</button>
        <button type="button" class="btn btn-primary SubmitButton">Отправить</button>
      </div>
      <div class="SpinnerSplash">
        <div class="Spinner"></div>
      </div>
    </div>
  </div>
</div>
`;
  return modalWrapperTemplate;
}
