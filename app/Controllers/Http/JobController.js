'use strict'

const Job = use('App/Models/Job');


class JobController {

  // async home({ view }) {
  //
  //   // create a job
  //   const job  = new Job();
  //   job.title = 'My job title';
  //   job.link = 'https://google.com';
  //   job.description = 'My job description';
  //   await job.save();
  // }


  async allJobs({ view }) {
    const jobs = await Job.query().orderBy('created_at', 'desc').fetch();
    return view.render('index', { jobs: jobs.toJSON() });
  }






}





module.exports = JobController
