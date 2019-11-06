$(document).ready(function () {
    const pensionButton = $('#calculatePension');
    const printButton = $('#printButton');
    let years = $('#yearsOfService').val();
    let deduction = $('#deduction').val();
    let pension = $('#total').val();
    
    function calculatePension () {
        return deduction * 12 * years;

    }
    function calculateGratuity () {
        return ((100 + 4) / 100) * pension;
    }

    function calculate (event) {
        event.preventDefault();
        pension = calculatePension();
        gratuity = calculateGratuity();
        $('#total').val(calculatePension());
        $('#gratuity').val(calculateGratuity());

        const data = {
            pension: $('#total').val(),
            gratuity: $('#gratuity').val()
        };
        const id = event.target.attributes[1].value;
        const url = `/users/updatePension/${id}`;

        $.ajax(url, {
            type: 'PUT',
            data        
        }).done(function () {
            M.toast({html: 'Pension saved'});
            event.target.disabled = true;
        }).fail(function () {
            M.toast({html: 'Error! Pension not saved'});
        });
    }

    function printPayment (event) {
        event.preventDefault();
        $('header').remove();
        $('button').remove();
        $('footer').remove();
        $('br').remove();
        window.print();
        alert('You will now be logged out');
        window.location.href = '/';
    }
    pensionButton.on('click', calculate);
    printButton.on('click', printPayment);

});