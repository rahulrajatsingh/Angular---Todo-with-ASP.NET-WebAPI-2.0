using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using TestAPIforAngular.Models;

namespace TestAPIforAngular.Controllers
{
    [Authorize]
    public class ToDosController : ApiController
    {
        private todoModel db = new todoModel();

        // GET: api/ToDos
        public IQueryable<ToDoItem> GetToDoItems()
        {
            return db.ToDoItems.Where(item => item.MarkAsClear == false).OrderByDescending(item => item.Id);
        }

        // GET: api/ToDos/5
        [ResponseType(typeof(ToDoItem))]
        public async Task<IHttpActionResult> GetToDoItem(int id)
        {
            ToDoItem toDoItem = await db.ToDoItems.FindAsync(id);
            if (toDoItem == null)
            {
                return NotFound();
            }

            return Ok(toDoItem);
        }

        // PUT: api/ToDos/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutToDoItem(ToDoItem toDoItem)
        {
            int id = toDoItem.Id;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != toDoItem.Id)
            {
                return BadRequest();
            }

            db.Entry(toDoItem).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ToDos
        [ResponseType(typeof(ToDoItem))]
        public async Task<IHttpActionResult> PostToDoItem(ToDoItem toDoItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ToDoItems.Add(toDoItem);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ToDoItemExists(toDoItem.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = toDoItem.Id }, toDoItem);
        }

        // DELETE: api/ToDos/5
        [ResponseType(typeof(ToDoItem))]
        public async Task<IHttpActionResult> DeleteToDoItem(int id)
        {
            ToDoItem toDoItem = await db.ToDoItems.FindAsync(id);
            if (toDoItem == null)
            {
                return NotFound();
            }

            toDoItem.MarkAsClear = true;
            
            db.Entry(toDoItem).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(toDoItem);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ToDoItemExists(int id)
        {
            return db.ToDoItems.Count(e => e.Id == id) > 0;
        }
    }
}