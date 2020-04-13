using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public static class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = new Activity
                {
                    Id = request.Id,
                    Category = request.Category,
                    City = request.City,
                    Date = request.Date,
                    Description = request.Description,
                    Title = request.Title,
                    Venue = request.Venue
                };
                _context.Activities.Add(activity);
                var success = await _context.SaveChangesAsync().ConfigureAwait(false) > 0;
                if (success)
                    return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}