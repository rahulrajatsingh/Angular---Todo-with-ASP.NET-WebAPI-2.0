namespace TestAPIforAngular.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class todoModel : DbContext
    {
        public todoModel()
            : base("name=todoModel")
        {
        }

        public virtual DbSet<ToDoItem> ToDoItems { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
