using Charisma.Common.Domain.Abstractions;
using Charisma.Common.Domain.Dtos;
using Charisma.Common.Domain.Entities.Conferences;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Charisma.Api.Application.Queries.Conference
{
    public class GetFeedbackList
    {

        public record Query : IRequest<List<Feedback>>;

        public class QueryHandler(IConferenceRepository conferenceRepository) : IRequestHandler<Query, List<Feedback>>
        {
            public async Task<List<Feedback>> Handle(Query request, CancellationToken cancellationToken)
            {
                var feedbacks = await conferenceRepository.GetFeedbacks();
                return [.. feedbacks.Select(x => new Feedback
                {
                    Id = x.Id,
                    AttendeeEmail = x.AttendeeEmail,
                    ConferenceId = x.ConferenceId,
                    Rating = x.Rating,
                    Message = x.Message

        })];
            }
        }

    }
}
