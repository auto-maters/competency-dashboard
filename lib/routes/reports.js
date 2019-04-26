'use strict';

var search = require('../server-controllers/search');

var express = require('express');
var moment = require('moment');
var router = express.Router();

router.get('/getCompetency', function (req, res) {
  search.getCompetencyList().then(function (result) {
    if (result.status === 'OK') {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  }).catch(function (e) {
    res.status(500, {
      error: e
    });
  });
});

router.get('/getTraining', function (req, res) {
  search.getTrainingList().then(function (result) {
    if (result.status === 'OK') {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  }).catch(function (e) {
    res.status(500, {
      error: e
    });
  });
});

router.post('/getReportData', function (req, res, next) {
  var reportConfig = {
    StartData: moment(req.body.StartData).format('YYYY-MM-DD'),
    EndDate: moment(req.body.EndDate).format('YYYY-MM-DD'),
    SearchType: req.body.SearchType,
    SearchText: req.body.SearchText,
    Competency: req.body.Competency,
    CompetencyLevel: req.body.CompetencyLevel,
    Training: req.body.Training,
    SearchByText: req.body.SearchByText
  };
  var Qry = "";
  if (reportConfig.SearchType == "Competency") {

    Qry = 'select emp_id EmployeeId,\n    emp_name EmployeeName,\n    emp_comp_date CompetencyDate,\n    emp_comp_name CompetencyName,\n    emp_comp_level CompetencyLevel,\n    comp_group CompetencyGroup,\n    created_by CreatedBy\n    from emp_comp\n    join\n    competency\n    on\n    competency.comp_name=emp_comp.emp_comp_name\n    where emp_comp_date between \'' + reportConfig.StartData + '\' and \'' + reportConfig.EndDate + '\' ';
    if (reportConfig.SearchByText && reportConfig.SearchText != "") {
      Qry += 'and emp_comp_name like (\'%' + reportConfig.SearchText + '%\')  or\n      emp_comp_level  like  (\'%' + reportConfig.SearchText + '%\') or emp_name like (\'%' + reportConfig.SearchText + '%\') \n      order by 2 Asc,3 desc,4 asc';
    } else {

      if (reportConfig.SearchByText == false && reportConfig.SearchText != "") {
        Qry += 'and emp_comp_name in(' + ('\'' + reportConfig.Competency.join('\',\'') + '\'') + ') and \n          emp_comp_level=\'' + reportConfig.CompetencyLevel + '\' and  cast (emp_id as text) like (\'%' + reportConfig.SearchText + '%\') \n          order by 2 Asc,3 desc,4 asc';
      } else {
        Qry += 'and emp_comp_name in(' + ('\'' + reportConfig.Competency.join('\',\'') + '\'') + ') and \n      emp_comp_level=\'' + reportConfig.CompetencyLevel + '\'\n      order by 2 Asc,3 desc,4 asc';
      }
    }
  } else if (reportConfig.SearchType == "Training") {
    Qry = 'select \n      emp_id EmployeeId,\n       emp_name EmployeeName,\n      emp_comp_date TrainingDate,\n       emp_comp_name TrainingName, \n       created_by CreatedBy\n      from emp_comp_training\n       where\n      emp_comp_date between \'' + reportConfig.StartData + '\' and \'' + reportConfig.EndDate + '\' ';

    if (reportConfig.SearchByText && reportConfig.SearchText != "") {

      Qry += 'and emp_comp_name like  (\'%' + reportConfig.SearchText + '%\') or   emp_name like (\'%' + reportConfig.SearchText + '%\')      order by 2 asc,3,4 asc';
    } else {
      if (reportConfig.SearchByText == false && reportConfig.SearchText != "") {
        Qry += 'and emp_comp_name in(' + ('\'' + reportConfig.Training.join('\',\'') + '\'') + ') and   cast (emp_id as text) like (\'%' + reportConfig.SearchText + '%\')      order by 2 asc,3,4 asc';
      } else {
        Qry += 'and emp_comp_name in(' + ('\'' + reportConfig.Training.join('\',\'') + '\'') + ')      order by 2 asc,3,4 asc';
      }
    }
  }
  search.dbSelectQryExecute(Qry).then(function (result) {
    res.status(200).json(result);
  }).catch(function (e) {
    res.status(500, {
      error: e
    });
  });
});
module.exports = router;