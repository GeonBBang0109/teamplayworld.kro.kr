/*
    ======================================
    + Apply Javascript
    @ Team. PLAYWORLD 2024. 07. 30.
    ======================================
*/

// Scroll Animation
const intersectionCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        const target = entry.target;
        if (target.classList.contains('section-intro')) {
            target.querySelector('.intro__wrap').classList.add('animation-right');
        }
        }
    });
};

const observer = new IntersectionObserver(intersectionCallback, {
    threshold: 0.2,
});

const introSection = document.querySelector('.section-intro');

if (introSection) {
    observer.observe(introSection);
}

// Visible Progress Box
document.addEventListener('DOMContentLoaded', () => {
    const progressBox = document.querySelector('.apply__form-progress-box');
    const section = document.querySelector('.apply__form');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBox.classList.add('fixed');
            } else {
                progressBox.classList.remove('fixed');
            }
        });
    }, { threshold: 0.2 });

    observer.observe(section);
});

// Label & Radio Script
const labels = document.querySelectorAll('.apply-form__section-field-forradio-label');

labels.forEach(label => {
    label.addEventListener('click', () => {
        labels.forEach(lbl => lbl.classList.remove('active'));
        label.classList.add('active');
    });
});

// Privacy Agree
const privacyAgreeCheckbox = document.querySelector('.privacy-agree-checkbox');

privacyAgreeCheckbox.addEventListener("change", () => {
    const privacyAgreeResult = document.querySelector('.privacy-agree-check');

    if(privacyAgreeCheckbox.checked) {
        privacyAgreeResult.value = "동의"
    } else {
        privacyAgreeResult.value = "거부"
    }
});

// Label & Radio Script
document.addEventListener('DOMContentLoaded', () => {
    const creatorRadio = document.querySelector('.apply-form__section-field-forradio[value="creator"]');
    const memberRadio = document.querySelector('.apply-form__section-field-forradio[value="member"]');
    const applicationTypeCheck = document.querySelector('.application-type-check');

    function updateApplicationType() {
        if (creatorRadio.checked) {
            applicationTypeCheck.value = '크리에이터';
        } else if (memberRadio.checked) {
            applicationTypeCheck.value = '멤버';
        }
    }

    creatorRadio.addEventListener('change', updateApplicationType);
    memberRadio.addEventListener('change', updateApplicationType);

    updateApplicationType();
});

// Send Data to Database
const firebaseConfig = {
    apiKey: "AIzaSyBoH33yLzEB3rMxCfvCgxqgtn4OeNS8xHk",
    authDomain: "teamplayworld-contact.firebaseapp.com",
    databaseURL: "https://teamplayworld-contact-default-rtdb.firebaseio.com",
    projectId: "teamplayworld-contact",
    storageBucket: "teamplayworld-contact.appspot.com",
    messagingSenderId: "1096825528207",
    appId: "1:1096825528207:web:464db603749d1b210eb5fa"
};
  
firebase.initializeApp(firebaseConfig);

const applyFormDatabase = firebase.database().ref('TEAM-PLAYWORLD-ApplyForm-DB');

function formSubmit(event) {
    event.preventDefault()
    const applyForm = document.querySelector('.apply__form');
    const name = document.querySelector('.name-input').value;
    const birth = document.querySelector('.birth-input').value;
    const gender = document.querySelector('.gender-selector').value;
    const operateSns = document.querySelector('.operate-sns-input').value;
    const operateSnsAdditional = document.querySelector('.operate-sns-additional-input').value;
    const email = document.querySelector('.email-input').value;
    const discordUsername = document.querySelector('.discordusername-input').value;
    const phone = document.querySelector('.phone-input').value;
    const applicationType = document.querySelector('.application-type-check').value;
    const portfolio = document.querySelector('.portfolio-input').value;
    const selfIntroduce = document.querySelector('.self-introduce-input').value;
    const privacy = document.querySelector('.privacy-agree-check').value;
    const timestamp = new Date().toString();

    sendData(name, birth, gender, discordUsername, email, phone, operateSns, operateSnsAdditional, applicationType, portfolio, selfIntroduce, privacy, timestamp);
    
    setTimeout(() => {
        applyForm.reset();
    }, 2000);
}

// Send Data
const sendData = (name, birth, gender, discordUsername, email, phone, operateSns, operateSnsAdditional, applicationType, portfolio, selfIntroduce, privacy, timestamp) => {
    var newForm = applyFormDatabase.push();

    newForm.set({
        "0) 이름": name,
        "1) 생년월일": birth,
        "2) 성별": gender,
        "3) Discord": discordUsername,
        "4) E-Mail": email,
        "5) 전화번호": phone,
        "6) 운영중인 SNS": operateSns,
        "7) 추가 운영중인 SNS": operateSnsAdditional,
        "8) 지원 유형": applicationType,
        "9) 포트폴리오": portfolio,
        "10) 자기소개": selfIntroduce,
        "11) 개인정보 처리방침 동의 여부": privacy,
        "12) 제출 시간": timestamp,
    });
};

// Section Sucess Script
document.addEventListener('DOMContentLoaded', () => {
    const sections = {
        section1: document.querySelector('.apply-form__section1'),
        section2: document.querySelector('.apply-form__section2'),
        section3: document.querySelector('.apply-form__section3'),
        section4: document.querySelector('.apply-form__section4')
    };

    const successSections = {
        section1Success: document.querySelector('.apply-form__section1-success'),
        section2Success: document.querySelector('.apply-form__section2-success'),
        section3Success: document.querySelector('.apply-form__section3-success'),
        section4Success: document.querySelector('.apply-form__section4-success')
    };

    const buttons = {
        personalInfoButton: document.querySelector('.personal-information-button'),
        contactButton: document.querySelector('.contact-button'),
        applicationTypeButton: document.querySelector('.application-type-button'),
        selfIntroduceButton: document.querySelector('.self-introduce-button')
    };

    const editButtons = document.querySelectorAll('.apply-form__section-success__edit-button');

    const sectionCompleted = {
        section1: false,
        section2: false,
        section3: false,
        section4: false
    };

    const progressImages = {
        personalInfo: document.querySelector('.apply__form-progress-box__img[alt="Personal Information Icon"]'),
        contact: document.querySelector('.apply__form-progress-box__img[alt="Contact Icon"]'),
        applicationType: document.querySelector('.apply__form-progress-box__img[alt="Application Type Icon"]'),
        portfolio: document.querySelector('.apply__form-progress-box__img[alt="Portfolio Icon"]'),
        success: document.querySelector('.apply__form-progress-box__img[alt="Success Icon"]')
    };

    const progressImageSources = {
        personalInfo: {
            default: "/static/images/svg/apply_personal_information_icon.svg",
            completed: "/static/images/svg/apply_personal_information_successed_icon.svg"
        },
        contact: {
            default: "/static/images/svg/apply_contact_icon.svg",
            completed: "/static/images/svg/apply_contact_successed_icon.svg"
        },
        applicationType: {
            default: "/static/images/svg/apply_application_type_icon.svg",
            completed: "/static/images/svg/apply_application_type_successed_icon.svg"
        },
        portfolio: {
            default: "/static/images/svg/apply_portfolio_icon.svg",
            completed: "/static/images/svg/apply_portfolio_successed_icon.svg"
        },
        success: {
            default: "/static/images/svg/apply_success_icon.svg",
            completed: "/static/images/svg/apply_successed_icon.svg"
        }
    };

    function showSection(element, animationClass) {
        if (element) {
            element.style.display = 'flex';
            setTimeout(() => {
                element.classList.add(animationClass);
                setTimeout(() => {
                    element.classList.remove(animationClass);
                }, 1500);
            }, 0);
        }
    }

    function hideSection(element, animationClass) {
        if (element) {
            element.classList.add(animationClass);
            setTimeout(() => {
                element.style.display = 'none';
                element.classList.remove(animationClass);
            }, 1500);
        }
    }

    function validatePersonalInformationInputs() {
        const nameInput = document.querySelector('.name-input');
        const birthInput = document.querySelector('.birth-input');
        const operateSnsInput = document.querySelector('.operate-sns-input');
        const operateSnsAdditionalInput = document.querySelector('.operate-sns-additional-input');
        const genderSelect = document.querySelector('.gender-selector');

        if (!nameInput || !birthInput || !operateSnsInput || !genderSelect) {
            console.error("인적사항 요소를 찾을 수 없습니다.");
            return false;
        }

        const name = nameInput.value ? nameInput.value.trim() : '';
        const birth = birthInput.value ? birthInput.value.trim() : '';
        const operateSns = operateSnsInput.value ? operateSnsInput.value.trim() : '';
        const operateSnsAdditional = operateSnsAdditionalInput ? operateSnsAdditionalInput.value.trim() : '';
        const gender = genderSelect.value;

        let isValid = true;

        if (!name) {
            isValid = false;
            nameInput.classList.add('incorrect-value');
            alert("성명을 올바르게 작성해 주세요.");
        } else {
            nameInput.classList.remove('incorrect-value');
        }

        if (!birth || isNaN(birth) || !(birth.length === 8)) {
            isValid = false;
            birthInput.classList.add('incorrect-value');
            alert("생년월일을 올바르게 작성해 주세요.");
        } else {
            birthInput.classList.remove('incorrect-value');
        }

        const validGenders = ["male", "female", "etc"];
        if (!gender || !validGenders.includes(gender)) {
            isValid = false;
            genderSelect.classList.add('incorrect-value');
            alert("성별은 '남성' 또는 '여성' 혹은 '기타'만 선택할 수 있습니다.");
        } else {
            genderSelect.classList.remove('incorrect-value');
        }

        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-@;,.?%&=]*)?$/i;
        if (!operateSns || !urlRegex.test(operateSns)) {
            isValid = false;
            operateSnsInput.classList.add('incorrect-value');
            alert("운영중인 SNS URL을 올바르게 작성해 주세요.");
        } else {
            operateSnsInput.classList.remove('incorrect-value');
        }

        if (operateSnsAdditional && !urlRegex.test(operateSnsAdditional)) {
            isValid = false;
            operateSnsAdditionalInput.classList.add('incorrect-value');
            alert("추가 운영중인 SNS URL을 올바르게 작성해 주세요.");
        } else {
            operateSnsAdditionalInput.classList.remove('incorrect-value');
        }

        return isValid;
    }

    function validateContactInputs() {
        const emailInput = document.querySelector('.email-input');
        const discordUsernameInput = document.querySelector('.discordusername-input');
        const phoneInput = document.querySelector('.phone-input');

        if (!emailInput || !discordUsernameInput || !phoneInput) {
            console.error("연락처 요소를 찾을 수 없습니다.");
            return false;
        }

        const email = emailInput.value ? emailInput.value.trim() : '';
        const discordUsername = discordUsernameInput.value ? discordUsernameInput.value.trim() : '';
        const phone = phoneInput.value ? phoneInput.value.trim() : '';

        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            isValid = false;
            emailInput.classList.add('incorrect-value');
            alert("올바른 이메일 주소를 작성해 주세요.");
        } else {
            emailInput.classList.remove('incorrect-value');
        }

        if (!discordUsername) {
            isValid = false;
            discordUsernameInput.classList.add('incorrect-value');
            alert("디스코드 사용자명을 올바르게 작성해 주세요.");
        } else {
            discordUsernameInput.classList.remove('incorrect-value');
        }

        if (phone && !/^\d{10,15}$/.test(phone)) {
            isValid = false;
            phoneInput.classList.add('incorrect-value');
            alert("올바른 전화번호를 작성해 주세요.");
        } else {
            phoneInput.classList.remove('incorrect-value');
        }

        return isValid;
    }

    function validateApplicationTypeInputs() {
        const applicationTypeInput = document.querySelector('.application-type-check');
        if (!applicationTypeInput) {
            console.error("지원 유형 요소를 찾을 수 없습니다.");
            return false;
        }

        const applicationType = applicationTypeInput.value ? applicationTypeInput.value.trim() : '';

        let isValid = true;

        if (!applicationType) {
            isValid = false;
            applicationTypeInput.classList.add('incorrect-value');
            alert("지원 유형을 선택해 주세요.");
        } else if (applicationType !== "멤버" && applicationType !== "크리에이터") {
            isValid = false;
            applicationTypeInput.classList.add('incorrect-value');
            alert("지원 유형은 '멤버' 또는 '크리에이터'만 선택할 수 있습니다.");
        } else {
            applicationTypeInput.classList.remove('incorrect-value');
        }

        return isValid;
    }

    /*
    function validateIntroduceInputs() {
        const portfolioInput = document.querySelector('.portfolio-input');
        const selfIntroduceInput = document.querySelector('.self-introduce-input');

        if (!portfolioInput || !selfIntroduceInput) {
            console.error("포트폴리오 또는 자기소개 요소를 찾을 수 없습니다.");
            return false;
        }

        const portfolio = portfolioInput.value ? portfolioInput.value.trim() : '';
        const selfIntroduce = selfIntroduceInput.value ? selfIntroduceInput.value.trim() : '';

        let isValid = true;

        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-@;,.?%&=]*)?$/i;

        if (portfolio && !urlRegex.test(portfolio)) {
            isValid = false;
            portfolioInput.classList.add('incorrect-value');
            alert("포트폴리오 URL을 올바르게 작성해 주세요.");
        } else {
            portfolioInput.classList.remove('incorrect-value');
        }

        if (!selfIntroduce || selfIntroduce.length < 100) {
            isValid = false;
            selfIntroduceInput.classList.add('incorrect-value');
            alert("자기소개는 100자 이상 작성해 주세요.");
        } else {
            selfIntroduceInput.classList.remove('incorrect-value');
        }

        return isValid;
    }
    */

    function handleCompletionClick(currentSection, nextSection, successSection, validateFunction, updateImage) {
        if (validateFunction()) {
            hideSection(currentSection, 'animation-right-reverse');
            setTimeout(() => {
                showSection(successSection, 'animation-left');
                sectionCompleted[currentSection.classList[1]] = true;

                if (nextSection) {
                    nextSection.style.display = 'flex';
                }

                if (updateImage) {
                    updateImage();
                }
            }, 1500);
        }
    }

    function handleEditButtonClick(sectionId) {
        const targetSection = document.querySelector(`.apply-form__section${sectionId}`);
        const targetSuccessSection = document.querySelector(`.apply-form__section${sectionId}-success`);
        const prevSection = document.querySelector(`.apply-form__section${sectionId - 1}`);
        const prevSuccessSection = document.querySelector(`.apply-form__section${sectionId - 1}-success`);
    
        if (targetSection && targetSuccessSection) {
            Object.values(successSections).forEach(successSec => {
                if (successSec !== prevSuccessSection && successSec.style.display === 'flex') {
                    hideSection(successSec, 'animation-left-reverse');
                }
            });
    
            Object.values(sections).forEach(sec => {
                if (sec !== targetSection && sec !== prevSection && sec.style.display === 'flex') {
                    hideSection(sec, 'animation-right-reverse');
                }
            });
    
            if (targetSuccessSection && targetSuccessSection.style.display === 'flex') {
                hideSection(targetSuccessSection, 'animation-left-reverse');
            }
    
            setTimeout(() => {
                if (prevSuccessSection) {
                    showSection(prevSuccessSection, 'animation-left');
                }
                showSection(targetSection, 'animation-right');
                observer.observe(targetSection);
            }, 1500);
    
            sectionCompleted[targetSection.classList[1]] = false;
    
            switch (sectionId) {
                case '1':
                    if (progressImages.personalInfo) {
                        progressImages.personalInfo.src = progressImageSources.personalInfo.default;
                    }
                case '2':
                    if (progressImages.contact) {
                        progressImages.contact.src = progressImageSources.contact.default;
                    }
                case '3':
                    if (progressImages.applicationType) {
                        progressImages.applicationType.src = progressImageSources.applicationType.default;
                    }
                case '4':
                    if (progressImages.portfolio) {
                        progressImages.portfolio.src = progressImageSources.portfolio.default;
                    }
                    if (progressImages.success) {
                        progressImages.success.src = progressImageSources.success.default;
                    }
                    break;
            }
        }
    }
    
    buttons.personalInfoButton.addEventListener('click', () => {
        handleCompletionClick(sections.section1, sections.section2, successSections.section1Success, validatePersonalInformationInputs, () => {
            if (progressImages.personalInfo) {
                progressImages.personalInfo.src = progressImageSources.personalInfo.completed;
            }
        });
    });

    buttons.contactButton.addEventListener('click', () => {
        handleCompletionClick(sections.section2, sections.section3, successSections.section2Success, validateContactInputs, () => {
            if (progressImages.contact) {
                progressImages.contact.src = progressImageSources.contact.completed;
            }
        });
    });

    buttons.applicationTypeButton.addEventListener('click', () => {
        handleCompletionClick(sections.section3, sections.section4, successSections.section3Success, validateApplicationTypeInputs, () => {
            if (progressImages.applicationType) {
                progressImages.applicationType.src = progressImageSources.applicationType.completed;
            }
        });
    });
    
    function validateForm() {
        const nameInput = document.querySelector('.name-input');
        const birthInput = document.querySelector('.birth-input');
        const genderSelector = document.querySelector('.gender-selector');
        const operateSnsInput = document.querySelector('.operate-sns-input');
        const operateSnsAdditionalInput = document.querySelector('.operate-sns-additional-input');
        const emailInput = document.querySelector('.email-input');
        const discordUsernameInput = document.querySelector('.discordusername-input');
        const phoneInput = document.querySelector('.phone-input');
        const applicationTypeCheck = document.querySelector('.application-type-check');
        const portfolioInput = document.querySelector('.portfolio-input');
        const selfIntroduceInput = document.querySelector('.self-introduce-input');
        const privacyAgreeCheckInput = document.querySelector('.privacy-agree-checkbox-visible');
        const privacyAgreeChecktext = document.querySelector('.privacy-agree-checkbox-text');
        const privacyAgreeCheck = document.querySelector('.privacy-agree-check');
    
        const validateFormName = nameInput ? nameInput.value.trim() : '';
        const validateFormBirth = birthInput ? birthInput.value.trim() : '';
        const validateFormGender = genderSelector ? genderSelector.value.trim() : '';
        const validateFormOperateSns = operateSnsInput ? operateSnsInput.value.trim() : '';
        const validateFormOperateSnsAdditional = operateSnsAdditionalInput ? operateSnsAdditionalInput.value.trim() : '';
        const validateFormEmail = emailInput ? emailInput.value.trim() : '';
        const validateFormDiscordUsername = discordUsernameInput ? discordUsernameInput.value.trim() : '';
        const validateFormPhone = phoneInput ? phoneInput.value.trim() : '';
        const validateFormApplicationType = applicationTypeCheck ? applicationTypeCheck.value.trim() : '';
        const validateFormPortfolio = portfolioInput ? portfolioInput.value.trim() : '';
        const validateFormSelfIntroduce = selfIntroduceInput ? selfIntroduceInput.value.trim() : '';
        const privacyAgreeCheckValue = privacyAgreeCheck ? privacyAgreeCheck.value.trim() : '';
    
        let isValid = true;
    
        function addIncorrectClass(input) {
            if (input) input.classList.add('incorrect-value');
        }
    
        function removeIncorrectClass(input) {
            if (input) input.classList.remove('incorrect-value');
        }
    
        if (!validateFormName) {
            isValid = false;
            addIncorrectClass(nameInput);
            alert("성명을 올바르게 작성해 주세요.");
        } else {
            removeIncorrectClass(nameInput);
        }
    
        if (!validateFormBirth || isNaN(validateFormBirth) || !(validateFormBirth.length === 8)) {
            isValid = false;
            addIncorrectClass(birthInput);
            alert("생년월일을 올바르게 작성해 주세요.");
        } else {
            removeIncorrectClass(birthInput);
        }
    
        const validGenders = ["male", "female", "etc"];
        if (!validateFormGender || !validGenders.includes(validateFormGender)) {
            isValid = false;
            addIncorrectClass(genderSelector);
            alert("성별은 '남성' 또는 '여성' 혹은 '기타'만 선택할 수 있습니다.");
        } else {
            removeIncorrectClass(genderSelector);
        }
    
        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-@;,.?%&=]*)?$/i;
    
        if (!validateFormOperateSns || !urlRegex.test(validateFormOperateSns)) {
            isValid = false;
            addIncorrectClass(operateSnsInput);
            alert("운영중인 SNS URL을 올바르게 작성해 주세요.");
        } else {
            removeIncorrectClass(operateSnsInput);
        }
    
        if (validateFormOperateSnsAdditional && !urlRegex.test(validateFormOperateSnsAdditional)) {
            isValid = false;
            addIncorrectClass(operateSnsAdditionalInput);
            alert("추가 운영중인 SNS URL을 올바르게 작성해 주세요.");
        } else {
            removeIncorrectClass(operateSnsAdditionalInput);
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!validateFormEmail || !emailRegex.test(validateFormEmail)) {
            isValid = false;
            addIncorrectClass(emailInput);
            alert("올바른 이메일 주소를 작성해 주세요.");
        } else {
            removeIncorrectClass(emailInput);
        }
    
        if (!validateFormDiscordUsername) {
            isValid = false;
            addIncorrectClass(discordUsernameInput);
            alert("디스코드 사용자명을 올바르게 작성해 주세요.");
        } else {
            removeIncorrectClass(discordUsernameInput);
        }
    
        if (validateFormPhone && !/^\d{10,15}$/.test(validateFormPhone)) {
            isValid = false;
            addIncorrectClass(phoneInput);
            alert("올바른 전화번호를 작성해 주세요.");
        } else {
            removeIncorrectClass(phoneInput);
        }
    
        if (!validateFormApplicationType || !['멤버', '크리에이터'].includes(validateFormApplicationType)) {
            isValid = false;
            addIncorrectClass(applicationTypeCheck);
            alert("지원 유형은 '멤버' 또는 '크리에이터'만 선택할 수 있습니다.");
        } else {
            removeIncorrectClass(applicationTypeCheck);
        }
    
        if (validateFormPortfolio && !urlRegex.test(validateFormPortfolio)) {
            isValid = false;
            addIncorrectClass(portfolioInput);
            alert("포트폴리오 URL을 올바르게 작성해 주세요.");
        } else {
            removeIncorrectClass(portfolioInput);
        }
    
        if (!validateFormSelfIntroduce || validateFormSelfIntroduce.length < 100) {
            isValid = false;
            addIncorrectClass(selfIntroduceInput);
            alert("자기소개는 100자 이상 작성해 주세요.");
        } else {
            removeIncorrectClass(selfIntroduceInput);
        }

        if (!privacyAgreeCheckValue || (privacyAgreeCheckValue !== '동의')) {
            isValid = false;
            addIncorrectClass(privacyAgreeCheckInput);
            addIncorrectClass(privacyAgreeChecktext);
            alert("개인정보 처리 방침에 동의해 주세요.");
        } else {
            removeIncorrectClass(privacyAgreeCheckInput);
            removeIncorrectClass(privacyAgreeChecktext);
        }
    
        return isValid;
    }

    buttons.selfIntroduceButton.addEventListener('click', (event) => {
        const isValid = validateForm();
    
        if (isValid) {
            hideSection(sections.section4, 'animation-right-reverse');
    
            const sectionIntro = document.querySelector('.section-intro');
            if (sectionIntro) {
                hideSection(sectionIntro, 'animation-right-reverse');
            }
    
            setTimeout(() => {
                Object.values(sections).forEach(section => {
                    if (section && section !== sections.section4) {
                        hideSection(section, 'animation-right-reverse');
                    }
                });
    
                Object.values(successSections).forEach(successSec => {
                    if (successSec && successSec !== successSections.section4Success) {
                        hideSection(successSec, 'animation-left-reverse');
                    }
                });
    
                showSection(successSections.section4Success, 'animation-left');
    
                if (progressImages.portfolio) {
                    progressImages.portfolio.src = progressImageSources.portfolio.completed;
                }
                if (progressImages.success) {
                    progressImages.success.src = progressImageSources.success.completed;
                }
            }, 1500);
            
            formSubmit(event);
            sectionCompleted[sections.section4.classList[1]] = true;
        }
    });
    
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = button.dataset.sectionId;
            handleEditButtonClick(sectionId);
        });
    });

    const observerOptions = {
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animation-right');
                setTimeout(() => {
                    entry.target.classList.remove('animation-right');
                }, 1500);
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sections).forEach(section => {
        if (section) observer.observe(section);
    });

    Object.values(successSections).forEach(successSection => {
        if (successSection) observer.observe(successSection);
    });

    Object.values(successSections).forEach(successSection => {
        if (successSection) successSection.style.display = 'none';
    });

    Object.values(sections).forEach((section, index) => {
        if (section) {
            section.style.display = index === 0 ? 'flex' : 'none';
        }
    });
});

// Live Validate
document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.querySelector('.name-input');
    const birthInput = document.querySelector('.birth-input');
    const genderSelector = document.querySelector('.gender-selector');
    const operateSnsInput = document.querySelector('.operate-sns-input');
    const operateSnsAdditionalInput = document.querySelector('.operate-sns-additional-input');
    const emailInput = document.querySelector('.email-input');
    const discordUsernameInput = document.querySelector('.discordusername-input');
    const phoneInput = document.querySelector('.phone-input');
    const applicationTypeCheck = document.querySelector('.application-type-check');
    const portfolioInput = document.querySelector('.portfolio-input');
    const selfIntroduceInput = document.querySelector('.self-introduce-input');
    const privacyAgreeRealInput = document.querySelector('.privacy-agree-checkbox');
    const privacyAgreeInput = document.querySelector('.privacy-agree-checkbox-visibled');
    const privacyAgreeCheck = document.querySelector('.privacy-agree-check');
    const privacyAgreeInputText = document.querySelector('.privacy-agree-checkbox-text');

    function validateName() {
        const value = nameInput.value.trim();
        if (!value) {
            nameInput.classList.add('incorrect-value');
        } else {
            nameInput.classList.remove('incorrect-value');
        }
    }

    function validateBirth() {
        const value = birthInput.value.trim();
        const isValid = value && !isNaN(value) && (value.length === 8);
        if (!isValid) {
            birthInput.classList.add('incorrect-value');
        } else {
            birthInput.classList.remove('incorrect-value');
        }
    }

    function validateGender() {
        const value = genderSelector.value.trim();
        const validGenders = ["male", "female", "etc"];
        if (!value || !validGenders.includes(value)) {
            genderSelector.classList.add('incorrect-value');
        } else {
            genderSelector.classList.remove('incorrect-value');
        }
    }

    function validateOperateSns() {
        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-@;,.?%&=]*)?$/i;
        const value = operateSnsInput.value.trim();
        if (!value || !urlRegex.test(value)) {
            operateSnsInput.classList.add('incorrect-value');
        } else {
            operateSnsInput.classList.remove('incorrect-value');
        }
    }

    function validateOperateSnsAdditional() {
        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-@;,.?%&=]*)?$/i;
        const value = operateSnsAdditionalInput.value.trim();
        if (value && !urlRegex.test(value)) {
            operateSnsAdditionalInput.classList.add('incorrect-value');
        } else {
            operateSnsAdditionalInput.classList.remove('incorrect-value');
        }
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const value = emailInput.value.trim();
        if (!value || !emailRegex.test(value)) {
            emailInput.classList.add('incorrect-value');
        } else {
            emailInput.classList.remove('incorrect-value');
        }
    }

    function validateDiscordUsername() {
        const value = discordUsernameInput.value.trim();
        if (!value) {
            discordUsernameInput.classList.add('incorrect-value');
        } else {
            discordUsernameInput.classList.remove('incorrect-value');
        }
    }

    function validatePhone() {
        const value = phoneInput.value.trim();
        if (value && !/^\d{10,15}$/.test(value)) {
            phoneInput.classList.add('incorrect-value');
        } else {
            phoneInput.classList.remove('incorrect-value');
        }
    }

    function validateApplicationType() {
        const value = applicationTypeCheck.value.trim();
        if (!value || !['멤버', '크리에이터'].includes(value)) {
            applicationTypeCheck.classList.add('incorrect-value');
        } else {
            applicationTypeCheck.classList.remove('incorrect-value');
        }
    }

    function validatePortfolio() {
        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-@;,.?%&=]*)?$/i;
        const value = portfolioInput.value.trim();
        if (value && !urlRegex.test(value)) {
            portfolioInput.classList.add('incorrect-value');
        } else {
            portfolioInput.classList.remove('incorrect-value');
        }
    }

    function validateSelfIntroduce() {
        const value = selfIntroduceInput.value.trim();
        if (!value || value.length < 100) {
            selfIntroduceInput.classList.add('incorrect-value');
        } else {
            selfIntroduceInput.classList.remove('incorrect-value');
        }
    }

    function validatePrivacyAgree() {
        const value = privacyAgreeCheck.value.trim();
        if (!value || (value !== '동의')) {
            isValid = false;
            privacyAgreeInput.classList.add('incorrect-value');
            privacyAgreeInputText.classList.add('incorrect-value');
        } else {
            privacyAgreeInput.classList.remove('incorrect-value');
            privacyAgreeInputText.classList.remove('incorrect-value');
        }
    }

    nameInput.addEventListener('input', validateName);
    birthInput.addEventListener('input', validateBirth);
    genderSelector.addEventListener('change', validateGender);
    operateSnsInput.addEventListener('input', validateOperateSns);
    operateSnsAdditionalInput.addEventListener('input', validateOperateSnsAdditional);
    emailInput.addEventListener('input', validateEmail);
    discordUsernameInput.addEventListener('input', validateDiscordUsername);
    phoneInput.addEventListener('input', validatePhone);
    applicationTypeCheck.addEventListener('change', validateApplicationType);
    portfolioInput.addEventListener('input', validatePortfolio);
    selfIntroduceInput.addEventListener('input', validateSelfIntroduce);
    privacyAgreeRealInput.addEventListener('change', validatePrivacyAgree);
});
