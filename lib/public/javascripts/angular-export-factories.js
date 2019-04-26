'use strict';

coreApp.factory('Excel', function ($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html \n        xmlns:o="urn:schemas-microsoft-com:office:office" \n        xmlns:x="urn:schemas-microsoft-com:office:excel" \n        xmlns="http://www.w3.org/TR/REC-html40">\n        <head><!--[if gte mso 9]><xml>\n        <x:ExcelWorkbook>\n        <x:ExcelWorksheets>\n        <x:ExcelWorksheet>\n        <x:Name>{worksheet}</x:Name>\n        <x:WorksheetOptions>\n        <x:DisplayGridlines/>\n        </x:WorksheetOptions>\n        </x:ExcelWorksheet>\n        </x:ExcelWorksheets>\n        </x:ExcelWorkbook>\n        </xml><![endif]-->\n        </head><body><table>{table}</table></body></html>',
        base64 = function base64(s) {
        return $window.btoa(unescape(encodeURIComponent(s)));
    },
        format = function format(s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        });
    };
    return {
        tableToExcel: function tableToExcel(tableId, worksheetName) {
            var table = $(tableId),
                ctx = { worksheet: worksheetName, table: table.html() },
                href = uri + base64(format(template, ctx));
            return href;
        }
    };
});