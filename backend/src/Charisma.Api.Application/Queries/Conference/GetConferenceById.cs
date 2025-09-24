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

    public class GetConferenceById
    {
        public class Query : IRequest<ConferenceDTO> { public int id { get; set; } }

        public class QueryHandler(IConferenceRepository conferenceRepository) : IRequestHandler<Query, ConferenceDTO>
        {
            public async Task<ConferenceDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var c = await conferenceRepository.GetConferenceById(request.id);

                var cDTO = new ConferenceDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    ConferenceTypeId = c.ConferenceTypeId,
                    LocationId = c.LocationId,
                    OrganizerEmail = c.OrganizerEmail,
                    CategoryId = c.CategoryId,
                    StartDate = c.StartDate,
                    EndDate = c.EndDate,
                    conferenceType = c.conferenceType,
                    location = c.location,
                    category = c.category
                };

                return cDTO;



            }
        }
    }
}
