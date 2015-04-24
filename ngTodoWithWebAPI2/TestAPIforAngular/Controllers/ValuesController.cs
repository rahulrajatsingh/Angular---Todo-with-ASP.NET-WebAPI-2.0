using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TestAPIforAngular.Models;

namespace TestAPIforAngular.Controllers
{
    [EnableCors(origins:"*", headers : "*", methods : "*")]
    public class ValuesController : ApiController
    {
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        //public IHttpActionResult Get(int id)
        //{
        //    return Ok(new Person
        //    {
        //        Name = "Rahul Singh",
        //        Avatar_Url = "http://rahulrajatsingh.com/wp-content/uploads/2014/06/rahulrajatsingh_1372219691_241.jpg"
        //    });
        //}

        //public HttpResponseMessage Get(int id)
        //{
        //    return Request.CreateResponse(HttpStatusCode.OK, new Person
        //    {
        //        Name = "Rahul Singh",
        //        Avatar_Url = "http://rahulrajatsingh.com/wp-content/uploads/2014/06/rahulrajatsingh_1372219691_241.jpg"
        //    });
        //}

        public Person Get(int id)
        {
            return new Person
            {
                Name = "Rahul Singh",
                Avatar_Url = "http://rahulrajatsingh.com/wp-content/uploads/2014/06/rahulrajatsingh_1372219691_241.jpg"
            };
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
