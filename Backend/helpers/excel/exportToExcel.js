const ExcelJS = require('exceljs');


const sanitizeExcel = (value) => {
    if (typeof value === "string" && /^[=+\-@]/.test(value)) {
        return "'" + value;
    }
    return value;
};

const exportToExcel = async (data, sheetName = 'Sheet1', columnMap = {}) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(sheetName);

    if (!data.length) {
        sheet.getCell('A1').value = 'No data found.';
        return workbook.xlsx.writeBuffer();
    }

    const keys = Object.keys(data[0]);

    const toTitleCase = (key) =>
        key
            .replace(/([A-Z])/g, ' $1')
            .replace(/[_-]/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
            .trim();

    sheet.columns = keys.map(key => ({
        header: columnMap[key] || toTitleCase(key),
        key,
        width: Math.max((columnMap[key] || toTitleCase(key)).length + 4, 16),
    }));

    // Style header row
    sheet.getRow(1).eachCell(cell => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, name: 'Arial', size: 11 };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = { bottom: { style: 'thin', color: { argb: 'FF000000' } } };
    });
    sheet.getRow(1).height = 20;

    // To prevent harmful stuff that can be injected into excel and be exeuted later on
    const sanitizedData = data.map(row => {
        const newRow = {};
        for (const key in row) {
            newRow[key] = sanitizeExcel(row[key]);
        }
        return newRow;
    });

    sheet.addRows(sanitizedData);

    // Zebra stripe — start from row 2, skip header (row 1)
    for (let i = 2; i <= data.length + 1; i++) {
        if (i % 2 === 0) {
            sheet.getRow(i).eachCell({ includeEmpty: true }, cell => {
                // Don't overwrite header styling
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E1F2' } };
            });
        }
    }

    return workbook.xlsx.writeBuffer();
};

module.exports = exportToExcel;