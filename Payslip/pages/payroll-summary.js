document.addEventListener('DOMContentLoaded', function() {
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
    document.getElementById('employeeName').textContent = data.name;
    document.getElementById('employeeRole').textContent = data.role;
    document.getElementById('employeeId').textContent = data.id;
    document.getElementById('date').textContent = new Date(data.date).toLocaleDateString('en-IN');
    document.getElementById('month').textContent = new Date(data.date).toLocaleString('default', { month: 'long' });

    document.getElementById('tblEmployeeId').textContent = data.id;
    document.getElementById('tblEmployeeName').textContent = data.name;
    document.getElementById('tblBasicSalary').textContent = Number(data.basicSalary).toLocaleString();
    document.getElementById('tblTotalSalary').textContent = Number(data.totalSalary).toLocaleString();
    document.getElementById('tblAdditions').textContent = Number(data.additions).toLocaleString();
    document.getElementById('tblDeductions').textContent = Number(data.deductions).toLocaleString();

    const totalEarnings = Number(data.totalSalary) + Number(data.additions) - Number(data.deductions);
    document.getElementById('totalEarnings').textContent = totalEarnings.toLocaleString();
}

function savePayrollSummary() {
    const data = JSON.parse(localStorage.getItem('payrollData'));
    
    if (!data) {
        alert('No data to save!');
        return;
    }
    const savedSummaries = JSON.parse(localStorage.getItem('savedPayrollSummaries')) || [];
    
    savedSummaries.push({
        ...data,
        savedDate: new Date().toISOString(),
        totalEarnings: Number(data.totalSalary) + Number(data.additions) - Number(data.deductions)
    });
    
    localStorage.setItem('savedPayrollSummaries', JSON.stringify(savedSummaries));
    
    alert('Payroll summary saved successfully.!');
}

function downloadAsPDF() {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = function() {
        const element = document.querySelector('.summary-box');
        
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