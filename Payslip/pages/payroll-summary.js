document.addEventListener('DOMContentLoaded', function () {
    const data = JSON.parse(localStorage.getItem('payrollData'));

    if (data) {
        populateData(data);

        document.querySelector('.btn-yellow').addEventListener('click', savePayrollSummary);
        document.querySelector('.btn-dark-custom').addEventListener('click', downloadAsPDF);
    } else {
        alert('No payroll information detected... Please generate payroll first.');
    }
});

function populateData(data) {
    const basicSalary = Number(data.basicSalary);
    const additions = Number(data.additions);
    const deductions = Number(data.deductions);

    const totalSalary = basicSalary + additions;
    const totalEarnings = totalSalary - deductions;

    document.getElementById('employeeName').textContent = data.name;
    document.getElementById('employeeRole').textContent = data.role;
    document.getElementById('employeeId').textContent = data.id;
    document.getElementById('date').textContent = new Date(data.date).toLocaleDateString('en-IN');
    document.getElementById('month').textContent = new Date(data.date).toLocaleString('default', { month: 'long' });

    document.getElementById('tblEmployeeId').textContent = data.id;
    document.getElementById('tblEmployeeName').textContent = data.name;
    document.getElementById('tblBasicSalary').textContent = basicSalary.toLocaleString();
    document.getElementById('tblAdditions').textContent = additions.toLocaleString();
    document.getElementById('tblDeductions').textContent = deductions.toLocaleString();
    document.getElementById('tblTotalSalary').textContent = totalSalary.toLocaleString();
    document.getElementById('totalEarnings').textContent = totalEarnings.toLocaleString();
}

function savePayrollSummary() {
    const data = JSON.parse(localStorage.getItem('payrollData'));

    if (!data) {
        alert('No data to save!');
        return;
    }

    const basicSalary = Number(data.basicSalary);
    const additions = Number(data.additions);
    const deductions = Number(data.deductions);

    const totalSalary = basicSalary + additions;
    const totalEarnings = totalSalary - deductions;

    const savedSummaries = JSON.parse(localStorage.getItem('savedPayrollSummaries')) || [];

    savedSummaries.push({
        ...data,
        totalSalary,
        totalEarnings,
        savedDate: new Date().toISOString()
    });

    localStorage.setItem('savedPayrollSummaries', JSON.stringify(savedSummaries));

    alert('Payroll summary saved successfully.!');
}

function downloadAsPDF() {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = function () {
        const element = document.querySelector('.payslipcontent');

        const opt = {
            margin: 10,
            filename: `payroll_summary_${document.getElementById('employeeId').textContent}_${document.getElementById('month').textContent}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    };
    document.head.appendChild(script);
}
