using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }

        // A way to seed basic data to the db
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Value>().HasData(
                new Value { Id = 1, Name = "Value 101" },
                new Value { Id = 2, Name = "Value 202" },
                new Value { Id = 3, Name = "Value 303" }
            );
        }
    }
}
