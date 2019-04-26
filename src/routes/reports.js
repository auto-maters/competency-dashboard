const search = require('../server-controllers/search');

const express = require('express');
let moment    =     require('moment')
const router = express.Router();

router.get('/getCompetency', (req, res) => {
  search.getCompetencyList().then((result) => {
    if (result.status === 'OK') {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  }).catch((e) => {
    res.status(500, {
      error: e,
    });
  });
});

router.get('/getTraining', (req, res) => {
  search.getTrainingList().then((result) => {
    if (result.status === 'OK') {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  }).catch((e) => {
    res.status(500, {
      error: e,
    });
  });
});

router.post('/getReportData',(req,res,next)=>{
  let reportConfig={
    StartData: moment(req.body.StartData).format('YYYY-MM-DD'),
    EndDate: moment(req.body.EndDate).format('YYYY-MM-DD'),
    SearchType      :req.body.SearchType,
    SearchText      :req.body.SearchText,
    Competency      :req.body.Competency,
    CompetencyLevel :req.body.CompetencyLevel,
    Training        :req.body.Training,
    SearchByText    :req.body.SearchByText
  }
  let Qry="";
  if(reportConfig.SearchType=="Competency")
  {

    Qry=`select emp_id EmployeeId,
    emp_name EmployeeName,
    emp_comp_date CompetencyDate,
    emp_comp_name CompetencyName,
    emp_comp_level CompetencyLevel,
    comp_group CompetencyGroup,
    created_by CreatedBy
    from emp_comp
    join
    competency
    on
    competency.comp_name=emp_comp.emp_comp_name
    where emp_comp_date between '${reportConfig.StartData}' and '${reportConfig.EndDate}' `;       
    if(reportConfig.SearchByText && reportConfig.SearchText !="")
    {
      Qry +=`and emp_comp_name like ('%${reportConfig.SearchText}%')  or
      emp_comp_level  like  ('%${reportConfig.SearchText}%') or emp_name like ('%${reportConfig.SearchText}%') 
      order by 2 Asc,3 desc,4 asc`
    }else{
      
      if(reportConfig.SearchByText==false && reportConfig.SearchText !="")
        {
          Qry +=`and emp_comp_name in(${`'`+reportConfig.Competency.join(`','`)+`'`}) and 
          emp_comp_level='${reportConfig.CompetencyLevel}' and  cast (emp_id as text) like ('%${reportConfig.SearchText}%') 
          order by 2 Asc,3 desc,4 asc`
         }         
         else{         
      Qry +=`and emp_comp_name in(${`'`+reportConfig.Competency.join(`','`)+`'`}) and 
      emp_comp_level='${reportConfig.CompetencyLevel}'
      order by 2 Asc,3 desc,4 asc`
    }
  }

  }
  else if(reportConfig.SearchType=="Training")
  {
      Qry=`select 
      emp_id EmployeeId,
       emp_name EmployeeName,
      emp_comp_date TrainingDate,
       emp_comp_name TrainingName, 
       created_by CreatedBy
      from emp_comp_training
       where
      emp_comp_date between '${reportConfig.StartData}' and '${reportConfig.EndDate}' `;

      if(reportConfig.SearchByText && reportConfig.SearchText !="")
    {

      Qry +=`and emp_comp_name like  ('%${reportConfig.SearchText}%') or   emp_name like ('%${reportConfig.SearchText}%')      order by 2 asc,3,4 asc`
        
    }else {
      if(reportConfig.SearchByText==false && reportConfig.SearchText !="")
        {
          Qry +=`and emp_comp_name in(${`'`+reportConfig.Training.join(`','`)+`'`}) and   cast (emp_id as text) like ('%${reportConfig.SearchText}%')      order by 2 asc,3,4 asc`
        
         }else{
          Qry +=`and emp_comp_name in(${`'`+reportConfig.Training.join(`','`)+`'`})      order by 2 asc,3,4 asc`
          
         }
    }
 
 
    }
  search.dbSelectQryExecute(Qry).then((result) => {
          res.status(200).json(result);
  }).catch((e) => {
    res.status(500, {
      error: e,
    });
  });
})
module.exports = router;
