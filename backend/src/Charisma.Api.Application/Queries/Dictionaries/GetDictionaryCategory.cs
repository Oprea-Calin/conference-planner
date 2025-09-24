using Charisma.Common.Domain.Abstractions;
using Charisma.Common.Domain.Dtos;
using Charisma.Common.Domain.Entities.Dictionaries;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Charisma.Api.Application.Queries.Dictionaries
{
    public class GetDictionaryCategory
    {
        public class Query : IRequest<List<DictionaryCategoryDTO>> { }

        public class QueryHandler(IDictionariesRepository dictionariesRepository) : IRequestHandler<Query, List<DictionaryCategoryDTO>>
        {
            public async Task<List<DictionaryCategoryDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var c = await dictionariesRepository.GetDictionaryCategory();

                var cDTO = c.Select(category => new DictionaryCategoryDTO
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
