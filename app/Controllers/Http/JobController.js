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



  async allUserJobs({view, auth}) {
        // Fetch all user's jobs
        // const jobs = await auth.user.jobs().fetch();
        const jobs = await auth.user.jobs().orderBy('created_at', 'desc').fetch();
        // console.log(jobs)
        // return view.render('jobs', { jobs: jobs.toJSON() })
        return view.render('jobs/all', { jobs: jobs.toJSON() });
    }



    async create({ request, response, session, auth}) {
        const job = request.all();
        const posted = await auth.user.jobs().create({
            title: job.title,
            link: job.link,
            description: job.description
        });
        session.flash({ message: 'Your job has been posted!' });
        return response.redirect('/jobs');
    }


    async detail({params, view}) {
      const job = await Job.find(params.id);
      return view.render('jobs/detail', { job: job });
    }



    async delete({ response, session, params}) {
        const job = await Job.find(params.id);
        await job.delete();
        session.flash({ message: 'Your job has been removed'});
        return response.redirect('/jobs');
    }



    async edit({ params, view }) {
        const job = await Job.find(params.id);
        return view.render('jobs/edit', { job: job });
    }



    async update ({ response, request, session, params }) {
        const job = await Job.find(params.id);
        job.title = request.all().title;
        job.link = request.all().link;
        job.description = request.all().description;
        await job.save();
        session.flash({ message: 'Your job has been updated. '});
        return response.redirect('/jobs');
    }






}





module.exports = JobController
