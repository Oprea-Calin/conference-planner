using Charisma.Common.Domain.Abstractions;
using Charisma.Common.Domain.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Charisma.Api.Application.Queries.Conference
{
    public class GetAllConferences
    {
        public class Query : IRequest<List<ConferenceDTO>> 
        {
            public DateTime? startDate { get; set; }
            public DateTime? endDate { get; set; }
            public string conferenceName { get; set; }
            public string location { get; set; }
            public string category { get; set; }
            public string email { get; set; }
        }

        public class QueryHandler(IConferenceRepository conferenceRepository) : IRequestHandler<Query, List<ConferenceDTO>>
        {
            public async Task<List<ConferenceDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var c = await conferenceRepository.GetAllConferences();

                var filtered = c.AsQueryable();

                if (request.startDate.HasValue)
                    filtered = filtered.Where(c => c.StartDate >= request.startDate.Value);

                if (request.endDate.HasValue)
                    filtered = filtered.Where(c => c.EndDate <= request.endDate.Value);

                if (!string.IsNullOrWhiteSpace(request.conferenceName))
                    filtered = filtered.Where(c => c.Name != null && c.Name.Contains(request.conferenceName, StringComparison.OrdinalIgnoreCase));

                if (!string.IsNullOrWhiteSpace(request.location))
                    filtered = filtered.Where(c => c.location != null && c.location.Name != null && c.location.Name.Contains(request.location, StringComparison.OrdinalIgnoreCase));

                if (!string.IsNullOrWhiteSpace(request.category))
                    filtered = filtered.Where(c => c.category != null && c.category.Name != null && c.category.Name.Contains(request.category, StringComparison.OrdinalIgnoreCase));

                if (!string.IsNullOrWhiteSpace(request.email))
                    filtered = filtered.Where(c => c.OrganizerEmail != null && c.OrganizerEmail.Contains(request.email, StringComparison.OrdinalIgnoreCase));


                var cDTO = filtered.Select(category => new ConferenceDTO
                {
                    Id = category.Id,
                    Name = category.Name,
                    ConferenceTypeId = category.ConferenceTypeId,
                    LocationId = category.LocationId,
                    OrganizerEmail = category.OrganizerEmail,
                    CategoryId = category.CategoryId,
                    StartDate = category.StartDate,
                    EndDate = category.EndDate,
                    conferenceType = category.conferenceType,
                    location = category.location,
                    category = category.category

                }
                ).ToList();

                return cDTO;

            }
        }
    }
}
