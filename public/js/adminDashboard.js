$('#alert_close').click(function(){
    $( "#alert_box" ).fadeOut( "slow", function() {
       });
    });
$(document).ready(function () {
    $('.collapsible').collapsible();
    $('.datepicker').datepicker();
    $('select').formSelect();
    $('.modal').modal();
    const personalInfoCollapsible = document.querySelector('#personalInfo');
    const nextOfKinInfoCollapsible = document.querySelector('#nextOfKinInfo');
    const qualificationInfoCollapsible = document.querySelector('#qualificationInfo');
    var spinner = document.querySelector('.preloader-wrapper');
    var personalInfo = document.personalInfo;
    var personalInfoInputs = [
        personalInfo.firstName,
        personalInfo.lastName,
        personalInfo.contactAddress,
        personalInfo.permanentAddress,
        personalInfo.gender,
        personalInfo.dateOfBirth,
        personalInfo.maritalStatus,
        personalInfo.religion,
        personalInfo.phoneNumber,
        personalInfo.nic,
        personalInfo.fatherName,
        personalInfo.motherName,
        personalInfo.spouseName,
        personalInfo.childrenNumber,
        personalInfo.stateOfOrigin,
        personalInfo.lga,
        personalInfo.dateOfJoin,
        personalInfo.dateOfConf,
        personalInfo.idNumber,
        personalInfo.password
    ];

    var nextOfKinInfo = document.nextOfKinInfo;
    var nextOfKinInputs = [
        nextOfKinInfo.nextOfKFirstName,
        nextOfKinInfo.nextOfKLastName,
        nextOfKinInfo.nextOfKContactAddress,
        nextOfKinInfo.nextOfKPermanentAddress,
        nextOfKinInfo.nextOfKGender,
        nextOfKinInfo.nextOfKDateOfBirth,
        nextOfKinInfo.nextOfKMaritalStatus,
        nextOfKinInfo.nextofKReligion,
        nextOfKinInfo.nextOfKPhone,
        nextOfKinInfo.nextOfKNIC,
        nextOfKinInfo.nextOfKFatherName,
        nextOfKinInfo.nextOfKMotherName,
        nextOfKinInfo.nextOfKSpouse,
        nextOfKinInfo.nextOfKChildrenNumber,
        nextOfKinInfo.nextOfKState,
        nextOfKinInfo.nextOfKLGA
    ];

    var qualification = document.qualification;
    var qualificationInputs = [
        qualification.oLevel,
        qualification.aLevel,
        qualification.sports,
        qualification.otherSkills,
        qualification.salary,
        qualification.bank,
        qualification.accountNumber,
        qualification.deduction,
        qualification.sortCode,
        qualification.duration
    ];

    var isPersonalInfoOKay = 'null';
    var isNextOfKinInfoOKay = 'null';
    var isQualificationInfoOKay = 'null';

    let url, data;
    const phoneRegExp = /^\d{11}$/;
    // const sortCodeRegExp = /^[0-9][0-9]-[0-9][0-9]-[0-9][0-9]$/;
    // const nicRegExp = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
    const numberRegularExp = /^\d+$/;
    const accountNumberRegExp = /^[0-9]{2}(?:[0-9]{8}|-[0-9]{3}-[0-9]{6})$/;

    function submitPersonalInfo (event) { 
        event.preventDefault();       
        for (var i = 0; i < personalInfoInputs.length; i++) {
            if (isEmpty(personalInfoInputs[i])) {
                personalInfoInputs[i].classList.add('invalid');
                personalInfoInputs[i].focus();
                M.toast({html: 'Please ensure you provide all personal information'});
                isPersonalInfoOKay = false;
                break;
            } else {
                isPersonalInfoOKay = true;
            }
        }
        
        if (isPersonalInfoOKay === true) {
            spinner.style.display = 'block';
            url = '/admins/personalInfo';
            data = {
                firstName: personalInfoInputs[0].value,
                lastName: personalInfoInputs[1].value,
                contactAddress: personalInfoInputs[2].value,
                permanentAddress: personalInfoInputs[3].value,
                gender: personalInfoInputs[4].value,
                dateOfBirth: personalInfoInputs[5].value,
                maritalStatus: personalInfoInputs[6].value,
                religion: personalInfoInputs[7].value,
                phoneNumber: personalInfoInputs[8].value,
                nic: personalInfoInputs[9].value,
                fatherName: personalInfoInputs[10].value,
                motherName: personalInfoInputs[11].value,
                spouseName: personalInfoInputs[12].value,
                childrenNumber: personalInfoInputs[13].value,
                stateOfOrigin: personalInfoInputs[14].value,
                lga: personalInfoInputs[15].value,
                dateOfJoin: personalInfoInputs[16].value,
                dateOfConf: personalInfoInputs[17].value,
                idNumber: personalInfoInputs[18].value,
                password: personalInfoInputs[19].value
            };
            setTimeout(function () {
                $.ajax(url, {
                    type: 'POST',
                    data,
                    success: (function () {
                        M.toast({html: 'Data saved successfully'});
                        spinner.style.display = 'none';
                    })
                }).fail(function () {
                    M.toast({
                        html: 'Error! Data not saved. Try again.'
                    });
                    spinner.style.display = 'none';
                });
                spinner.style.display = 'none';
            }, 2500);
        }
    }

    function submitNextOfKinInfo (event) { 
        event.preventDefault();
        const personalInfoCheck = personalInfo.idNumber;
        for (var i = 0; i < nextOfKinInputs.length; i++) {
            if (isEmpty(nextOfKinInputs[i])) {
                nextOfKinInputs[i].classList.add('invalid');
                nextOfKinInputs[i].focus();
                isNextOfKinInfoOKay = false;
                break;
            }  else if (isEmpty(personalInfoCheck)) {
                isNextOfKinInfoOKay = false;
                M.toast({html: 'Please provide personal details first.'});
            } else {
                isNextOfKinInfoOKay = true;
            }
        }

        if (isNextOfKinInfoOKay === true) {
            spinner.style.display = 'block';
            url = '/admins/nextOfKinInfo';
            data = {
                nextOfKFirstName: nextOfKinInputs[0].value,
                nextOfKLastName: nextOfKinInputs[1].value,
                nextOfKContactAddress: nextOfKinInputs[2].value,
                nextOfKPermanentAddress: nextOfKinInputs[3].value,
                nextOfKGender: nextOfKinInputs[4].value,
                nextOfKDateOfBirth: nextOfKinInputs[5].value,
                nextOfKMaritalStatus: nextOfKinInputs[6].value,
                nextofKReligion: nextOfKinInputs[7].value,
                nextOfKPhone: nextOfKinInputs[8].value,
                nextOfKNIC: nextOfKinInputs[9].value,
                nextOfKFatherName: nextOfKinInputs[10].value,
                nextOfKMotherName: nextOfKinInputs[11].value,
                nextOfKSpouse: nextOfKinInputs[12].value,
                nextOfKChildrenNumber: nextOfKinInputs[13].value,
                nextOfKState: nextOfKinInputs[14].value,
                nextOfKLGA: nextOfKinInputs[15].value,
                firstName: personalInfoInputs[0].value ,
                lastName: personalInfoInputs[1].value
            };
            setTimeout(function () {
                $.ajax(url, {
                    type: 'PUT',
                    data
                }).done(function () {
                    M.toast({html: 'Data saved successfully'});
                    spinner.style.display = 'none';
                }).fail(function (jqXHR, status) {
                    M.toast({
                        html: 'Error! Data not saved. Try again.'
                    });
                    spinner.style.display = 'none';
                });
                spinner.style.display = 'none';
            }, 2500);
        }
    }

    function submitQualificationInfo (event) { 
        event.preventDefault();       
        const nextOfKinInfoCheck = nextOfKinInfo.nextOfKLGA;
        for (var i = 0; i < qualificationInputs.length; i++) {
            if (isEmpty(qualificationInputs[i])) {
                qualificationInputs[i].classList.add('invalid');
                qualificationInputs[i].focus();
                isQualificationInfoOKay = false;
                break;
            } else if (isEmpty(nextOfKinInfoCheck)) {
                isQualificationInfoOKay = false;
                M.toast({html: 'Please provide personal details and next of Kin Details first first.'});
            } else {
                isQualificationInfoOKay = true;
            }
        }

        if (isQualificationInfoOKay === true) {
            spinner.style.display = 'block';
            url = '/admins/qualificationInfo';
            data = {
                oLevel: qualificationInputs[0].value,
                aLevel: qualificationInputs[1].value,
                sports: qualificationInputs[2].value,
                otherSkills: qualificationInputs[3].value,
                salary: qualificationInputs[4].value,
                bank: qualificationInputs[5].value,
                accountNumber: qualificationInputs[6].value,
                deduction: qualificationInputs[7].value,
                sortCode: qualificationInputs[8].value,
                duration: qualificationInputs[9].value,
                firstName: personalInfoInputs[0].value ,
                lastName: personalInfoInputs[1].value
            };
           setTimeout(function () {
            $.ajax(url, {
                type: 'PUT',
                data
            }).done(function () {
                M.toast({html: 'Data saved successfully'});
                const redirect = confirm('Data saved successfully. Do you wish to submit more data?');
                if (redirect === true) {
                    window.location.href = '/admins/dashboard';
                } else {
                    window.location.href = '/';
                }
                
            }).fail(function (jqXHR, status) {
                M.toast({
                    html: 'Error! Data not saved. Try again.'
                });
                spinner.style.display = 'none';
            });
            spinner.style.display = 'none';
           }, 2500);
        }
    }

    function isEmpty (element) {
        if (element.value === '' || element.value.trim() === '') {
            return true;
        } else {
            return false;
        }
    }

    function checkUserInfo () {
        personalInfo.phoneNumber.addEventListener('keyup', function (event) {
            if (!phoneRegExp.test(event.target.value)) {
                event.target.classList.add('invalid');
                event.target.classList.remove('valid');
            } else {
                event.target.classList.add('valid');
                event.target.classList.remove('invalid');
            }
        }, false);
        personalInfo.phoneNumber.addEventListener('focusout', function (event) {
            if (!phoneRegExp.test(event.target.value)) {
                event.target.classList.add('invalid');
                event.target.classList.remove('valid');
                event.target.focus();
                M.toast({
                    html: 'Please provide a valid phone number to continue'
                });
            } else {
                event.target.classList.add('valid');
                event.target.classList.remove('invalid');
            }
        }, false);   

        personalInfo.nic.addEventListener('keyup', function () {
            var foo = this.value.split("-").join(""); // remove hyphens
            if (foo.length > 0) {
              foo = foo.match(new RegExp('.{1,4}', 'g')).join("-");
            }
            this.value = foo;
        }, false);
        personalInfo.nic.addEventListener('keyup', function (event) {
            if (event.target.value.length != 19) {
                event.target.classList.add('invalid');
                event.target.classList.remove('valid');
            } else {
                event.target.classList.add('valid');
                event.target.classList.remove('invalid');
            }
        }, false);
        personalInfo.nic.addEventListener('focusout', function (event) {
            if (event.target.value.length != 19) {
                event.target.classList.add('invalid');
                event.target.classList.remove('valid');
                event.target.focus();
                M.toast({
                    html: 'Please provide a valid NIC number to continue'
                });
            } else {
                event.target.classList.add('valid');
                event.target.classList.remove('invalid');
            }
        }, false);

        nextOfKinInfo.nextOfKPhone.addEventListener('keyup', function (event) {
            if (!phoneRegExp.test(event.target.value)) {
                event.target.classList.add('invalid');
                event.target.classList.remove('valid');
            } else {
                event.target.classList.add('valid');
                event.target.classList.remove('invalid');
            }
        }, false);
    
        nextOfKinInfo.nextOfKPhone.addEventListener('focusout', function (event) {
            if (!phoneRegExp.test(event.target.value)) {
                event.target.classList.add('invalid');
                event.target.classList.remove('valid');
                event.target.focus();
                M.toast({
                    html: 'Please provide a phone number to continue'
                });
            } else {
                event.target.classList.add('valid');
                event.target.classList.remove('invalid');
            }
        }, false);  
        
        nextOfKinInfo.nextOfKNIC.addEventListener('keyup', function () {
            var foo = this.value.split("-").join(""); // remove hyphens
            if (foo.length > 0) {
              foo = foo.match(new RegExp('.{1,4}', 'g')).join("-");
            }
            this.value = foo;
        }, false);
        nextOfKinInfo.nextOfKNIC.addEventListener('keyup', function (event) {
            if (event.target.value.length != 19) {
                event.target.classList.add('invalid');
                event.target.classList.remove('valid');
            } else {
                event.target.classList.add('valid');
                event.target.classList.remove('invalid');
            }
        }, false);
        nextOfKinInfo.nextOfKNIC.addEventListener('focusout', function (event) {
            if (event.target.value.length != 19) {
                event.target.classList.add('invalid');
                event.target.classList.remove('valid');
                event.target.focus();
                M.toast({
                    html: 'Please provide a valid NIC number to continue'
                });
            } else {
                event.target.classList.add('valid');
                event.target.classList.remove('invalid');
            }
        }, false);

        qualification.sortCode.addEventListener('keyup', function () {
            var foo = this.value.split("-").join(""); // remove hyphens
            if (foo.length > 0) {
              foo = foo.match(new RegExp('.{1,2}', 'g')).join("-");
            }
            this.value = foo;
        }, false);
        qualification.sortCode.addEventListener('keyup', function (event) {
            if (event.target.value.length != 8) {
                event.target.classList.add('invalid');
                event.target.classList.remove('valid');
            } else {
                event.target.classList.add('valid');
                event.target.classList.remove('invalid');
            }
        }, false);
        qualification.sortCode.addEventListener('focusout', function (event) {
            if (event.target.value.length != 8) {
                event.target.classList.add('invalid');
                event.target.classList.remove('valid');
                event.target.focus();
                M.toast({
                    html: 'Please provide a valid sort code to continue'
                });
            } else {
                event.target.classList.add('valid');
                event.target.classList.remove('invalid');
            }
        }, false);

        qualification.salary.addEventListener('focusout', function (event) {
            if (!numberRegularExp.test(event.target.value)) {
                event.target.classList.add('invalid');
                event.target.classList.remove('valid');
                event.target.focus();
                M.toast({
                    html: 'Please provide a valid salary to continue'
                });
            } else {
                event.target.classList.add('valid');
                event.target.classList.remove('invalid');
            }
        }, false);

        qualification.salary.addEventListener('keyup', function (event) {
            if (!numberRegularExp.test(event.target.value)) {
                event.target.classList.add('invalid');
                event.target.classList.remove('valid');
            } else {
                event.target.classList.add('valid');
                event.target.classList.remove('invalid');
            }
        }, false);
        
        qualification.deduction.addEventListener('focusout', function (event) {
            if (!numberRegularExp.test(event.target.value)) {
                event.target.classList.add('invalid');
                event.target.classList.remove('valid');
                event.target.focus();
                M.toast({
                    html: 'Please provide a valid amount to continue'
                });
            } else {
                event.target.classList.add('valid');
                event.target.classList.remove('invalid');
            }
        }, false);
        qualification.deduction.addEventListener('keyup', function (event) {
            if (!numberRegularExp.test(event.target.value)) {
                event.target.classList.add('invalid');
                event.target.classList.remove('valid');
            } else {
                event.target.classList.add('valid');
                event.target.classList.remove('invalid');
            }
        }, false);

        qualification.accountNumber.addEventListener('focusout', function (event) {
            if (!accountNumberRegExp.test(event.target.value)) {
                event.target.classList.add('invalid');
                event.target.classList.remove('valid');
                event.target.focus();
                M.toast({
                    html: 'Please provide a valid account number to continue'
                });
            } else {
                event.target.classList.add('valid');
                event.target.classList.remove('invalid');
            }
        }, false);
        qualification.accountNumber.addEventListener('keyup', function (event) {
            if (!accountNumberRegExp.test(event.target.value)) {
                event.target.classList.add('invalid');
                event.target.classList.remove('valid');
            } else {
                event.target.classList.add('valid');
                event.target.classList.remove('invalid');
            }
        }, false);
    };
    personalInfo.addEventListener('submit', submitPersonalInfo, false);
    nextOfKinInfo.addEventListener('submit', submitNextOfKinInfo, false);
    qualification.addEventListener('submit', submitQualificationInfo, false);
    checkUserInfo();
});