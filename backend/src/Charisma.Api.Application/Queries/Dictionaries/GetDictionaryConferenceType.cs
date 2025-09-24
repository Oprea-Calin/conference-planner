using Charisma.Common.Domain.Abstractions;
using Charisma.Common.Domain.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Charisma.Api.Application.Queries.Dictionaries
{
    public class GetDictionaryConferenceType
    {
        public class Query : IRequest<List<DictionaryConferenceTypeDTO>> { }

        public class QueryHandler(IDictionariesRepository dictionariesRepository) : IRequestHandler<Query, List<DictionaryConferenceTypeDTO>>
        {
            public async Task<List<DictionaryConferenceTypeDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var c = await dictionariesRepository.GetDictionaryConferenceType();

                var cDTO = c.Select(category => new DictionaryConferenceTypeDTO
                {
                    Id = category.Id,
                    Name = category.Name,
                    Code = category.Code
                }
                ).ToList();

                return cDTO;



            }

        }
    }
}
