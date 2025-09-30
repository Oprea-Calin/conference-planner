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
    public class GetLocation
    {
        public class Query : IRequest<List<LocationDTO>> { }

        public class QueryHandler(IConferenceRepository conferenceRepository) : IRequestHandler<Query, List<LocationDTO>>
        {
            public async Task<List<LocationDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var c = await conferenceRepository.GetLocation();

                var cDTO = c.Select(category => new LocationDTO
                {
                    Id = category.Id,
                    Name = category.Name,
                    Code = category.Code,
                    CountryId = category.CountryId,
                    Address = category.Address,
                    CountyId = category.CountyId,
                    CityId = category.CityId,
                    Latitude = category.Latitude,
                    Longitude = category.Longitude,
                    Country = category.Country,
                    City = category.City,
                    County = category.County
                }
                ).ToList();

                return cDTO;



            }
        }
    }
}
