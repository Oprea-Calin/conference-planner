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
        public class Query : IRequest<List<ConferenceDTO>> { }

        public class QueryHandler(IConferenceRepository conferenceRepository) : IRequestHandler<Query, List<ConferenceDTO>>
        {
            public async Task<List<ConferenceDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var c = await conferenceRepository.GetAllConferences();

                var cDTO = c.Select(category => new ConferenceDTO
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
