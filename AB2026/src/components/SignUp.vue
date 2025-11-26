<template>
  <div class="sec" id="sec4">
    <div class="mid_content" data-aos="fade-up">
      <div class="sec_title">
        <h2 class="title_bg_box">
          <img src="@/assets/image/title_bg.png" alt="">
          {{ infoData.title }}
        </h2>
      </div>

      <div class="form_wrap">
        <form name="data_form" id="data_form" @submit.prevent="checkVal">
          <div class="form_item">
            <div class="title">姓名<span>必填</span></div>
            <div class="input">
              <input type="text" v-model="form.Name" class="single_line" placeholder="姓名" ref="nameInput">
            </div>
          </div>

          <div class="form_item">
            <div class="title">行動電話<span>必填</span></div>
            <div class="input">
              <input type="text" v-model="form.Mobile" class="single_line" placeholder="行動電話" ref="mobileInput">
            </div>
          </div>

          <div class="form_item">
            <div class="title">年齡<span>必填</span></div>
            <div class="input_select">
              <select v-model="form.Age" ref="ageInput">
                <option value="" selected>請選擇</option>
                <option value="20歲以下">20歲以下</option>
                <option value="20-25">20-25歲</option>
                <option value="26-35">26-35歲</option>
                <option value="36-45">36-45歲</option>
                <option value="46-55">46-55歲</option>
                <option value="56-65">56-65歲</option>
                <option value="66歲以上">66歲以上</option>
              </select>
            </div>
          </div>

          <div class="form_item">
            <div class="title">電子信箱<span>必填</span></div>
            <div class="input">
              <input type="text" v-model="form.Email" class="single_line" placeholder="Email" ref="emailInput">
            </div>
          </div>

          <div class="form_item">
            <div class="title">公司單位<span>必填</span></div>
            <div class="input">
              <input type="text" v-model="form.Company_name" class="single_line" placeholder="公司單位" ref="companyInput">
            </div>
          </div>

          <div class="form_item">
            <div class="title">產業別<span>必填</span></div>
            <div class="input_select">
              <select v-model="form.Industry" ref="industryInput">
                <option value="" selected>請選擇</option>
                <option value="學生">學生</option>
                <option value="農、林、漁、牧業">農、林、漁、牧業</option>
                <option value="教育服務業">教育服務業</option>
                <option value="醫療保健及社會工作服務業">醫療保健及社會工作服務業</option>
                <option value="製造業">製造業</option>
                <option value="服務業">服務業</option>
                <option value="公務人員">公務人員</option>
                <option value="自營商">自營商</option>
                <option value="家管">家管</option>
                <option value="自由工作者">自由工作者</option>
                <option value="其他">其他</option>
              </select>
            </div>
          </div>

          <div class="form_item">
            <div class="title">職稱<span>必填</span></div>
            <div class="input">
              <input type="text" v-model="form.Job_title" class="single_line" placeholder="職稱" ref="titleInput">
            </div>
          </div>

          <div class="form_item">
            <div class="title">報名場次<span>必填</span></div>
            <div class="input_select">
              <select v-model="form.sessions" ref="sessionsInput">
                <option value="" selected>請選擇</option>
                <option value="1/6（二）臺中場">1/6（二）臺中場</option>
                <option value="1/7（三）臺北場">1/7（三）臺北場</option>
                <option value="1/8（四）高雄場">1/8（四）高雄場</option>
              </select>
            </div>
          </div>

          <div class="form_item form_item_source">
            <div class="title">活動資料來源<span>必填</span></div>
            <div class="input_select">
              <select v-model="form.source" ref="sourceInput">
                <option value="" selected>請選擇</option>
                <option value="今周刊">今周刊</option>
                <option value="聯博投信">聯博投信</option>
                <option value="券商宣傳">券商宣傳</option>
                <option value="Facebook">Facebook</option>
                <option value="其他">其他</option>
              </select>
            </div>
          </div>

          <div class="field">
            <div class="field-labelblock">
              <input type="checkbox" class="ckBox" v-model="form.Is_agree" id="Is_agree" ref="agreeInput">
              <span class="field-label">*我同意下列條款</span>
            </div>
            <div class="field-content full">
              謹依個人資料保護法第8條規定告知以下事項：
              <br>
              您為本次活動的參與者（以下簡稱參與人）。
              參與人所填寫的資料將會提供予今周刊。請確認所有參與人在勾選同意前已詳閱並同意以下條款：今周刊基於客戶管理、統計及調查分析、行銷及其他合於營業登記項目或章程所定業務需要或其他法令所准許之特定目的，向參與人蒐集前述個人資料，並管理維護及處理利用，其得就該等個人資料用於寄送出版物、提供各項服務或活動訊息與調查分析使用。參與人得向活動執行單位請求查閱、提供複本、更正或補充個人資訊，及請求刪除或停止處理利用。若參與人填寫資料不完整時，可能會影響參與人獲得今周刊所提供之服務或各項訊息通知與活動之權益。
              <br>
              活動全程免費，主辦單位保有修改活動內容及審核出席的權利。
            </div>
          </div>

          <div class="btn_wrap">
            <input type="button" class="submit" id="btn" value="確認 >" @click="checkVal" :disabled="isSubmitting">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';

defineProps({
  infoData: {
    type: Object,
    default: () => ({})
  }
});

const form = reactive({
  Name: '',
  Mobile: '',
  Age: '',
  Email: '',
  Company_name: '',
  Industry: '',
  Job_title: '',
  sessions: '',
  source: '',
  Is_agree: false
});

const isSubmitting = ref(false);

// Refs for focus
const nameInput = ref(null);
const mobileInput = ref(null);
const ageInput = ref(null);
const emailInput = ref(null);
const companyInput = ref(null);
const industryInput = ref(null);
const titleInput = ref(null);
const sessionsInput = ref(null);
const sourceInput = ref(null);
const agreeInput = ref(null);

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(email);
};

const checkVal = () => {
  let error = false;
  let txt = '錯誤:';

  if (!form.Name) {
    txt += ' \n✻ 請輸入姓名';
    if (!error) nameInput.value?.focus();
    error = true;
  }

  const phone = form.Mobile.replace(/[^0-9.]/g, '');
  if (!form.Mobile) {
    txt += '\n✻ 請輸入聯絡手機';
    if (!error) mobileInput.value?.focus();
    error = true;
  } else {
    const mobileReg = /^(09)[0-9]{8}$/;
    if (!mobileReg.test(phone)) {
      txt += '\n✻ 手機格式錯誤，格式為十個數字 ex 0912345678';
      if (!error) mobileInput.value?.focus();
      error = true;
    }
  }

  if (!form.Age) {
    txt += ' \n✻ 請選擇年齡選項';
    if (!error) ageInput.value?.focus();
    error = true;
  }

  if (!form.Email) {
    txt += '\n✻ 請輸入Email';
    if (!error) emailInput.value?.focus();
    error = true;
  } else if (!validateEmail(form.Email)) {
    txt += '\n✻ Email信箱格式不正確，格式 ex example@mail.com';
    if (!error) emailInput.value?.focus();
    error = true;
  }

  if (!form.Company_name) {
    txt += ' \n✻ 請輸入公司單位';
    if (!error) companyInput.value?.focus();
    error = true;
  }

  if (!form.Industry) {
    txt += ' \n✻ 請選擇產業別';
    if (!error) industryInput.value?.focus();
    error = true;
  }

  if (!form.Job_title) {
    txt += ' \n✻ 請輸入職稱';
    if (!error) titleInput.value?.focus();
    error = true;
  }

  if (!form.sessions) {
    txt += ' \n✻ 請選擇報名場次';
    if (!error) sessionsInput.value?.focus();
    error = true;
  }

  if (!form.source) {
    txt += ' \n✻ 請選擇活動資料來源';
    if (!error) sourceInput.value?.focus();
    error = true;
  }

  if (!form.Is_agree) {
    txt += '\n✻ 請勾選同意條款';
    if (!error) agreeInput.value?.focus();
    error = true;
  }

  if (error) {
    alert(txt);
    return;
  }

  signUp();
};

const signUp = async () => {
  isSubmitting.value = true;

  try {
    // API 尚未準備好，暫時註解
    // const formData = new FormData();
    // for (const key in form) {
    //   formData.append(key, form[key]);
    // }
    // const response = await axios.post(`https://${window.location.hostname}/backend/AB2025/sign_up`, formData);
    
    // 模擬成功回應
    const response = { data: { bIsSuccess: 1 } };
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (response.data.bIsSuccess == 0) {
      alert(response.data.sError);
    } else {
      alert("感謝您的報名，本活動報名採審核制，座位席次有限，審核結果將於活動前前三天發送簡訊通知。");
      // Reset form
      Object.keys(form).forEach(key => {
        if (key === 'Is_agree') form[key] = false;
        else form[key] = '';
      });
      // Scroll to agenda
      const sec3 = document.querySelector('#sec3');
      if (sec3) sec3.scrollIntoView({ behavior: 'smooth' });
    }
  } catch (error) {
    console.error(error);
    alert("系統忙碌中，請稍後再試！");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>

.form_item_source {
  width: 98%;
  flex-basis: 100%;
  max-width: 100%;
}


@media screen and (max-width: 768px) {
  .form_item_source {
    width: 100%;
  }
}
</style>