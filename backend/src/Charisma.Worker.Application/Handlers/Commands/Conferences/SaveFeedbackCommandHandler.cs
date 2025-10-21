using Charisma.Common.Domain.Abstractions;
using Charisma.Common.Domain.Dtos.Commands.Conferences;
using Charisma.Common.Domain.Dtos.Events.Conferences;
using Charisma.Common.Domain.Entities.Conferences;
using MediatR;
using NBB.Messaging.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Charisma.Worker.Application.Handlers.Commands.Conferences
{
    public class SaveFeedbackCommandHandler(
        IConferenceRepository conferenceRepository,
        IMessageBusPublisher messageBusPublisher)
        : IRequestHandler<SaveFeedback>
    {
        public async Task Handle(SaveFeedback request, CancellationToken cancellationToken)
        {
            var allSpeakers = await conferenceRepository.GetSpeakers();
            //is there a new conference
            {
                var feedback = new Feedback
                {
                    Id = request.Id,
                    AttendeeEmail = request.AttendeeEmail,
                    ConferenceId = request.ConferenceId,
                    SpeakerId = request.SpeakerId,
                    Rating = request.Rating,
                    Message = request.Message
                };




                conferenceRepository.AddFeedback(feedback);
                await conferenceRepository.Save(cancellationToken);
                await messageBusPublisher.PublishAsync(new FeedbackSent(), cancellationToken);

                await messageBusPublisher.PublishAsync(new Feedback
                {
                    Id = request.Id,
                    AttendeeEmail = request.AttendeeEmail,
                    ConferenceId = request.ConferenceId,
                    SpeakerId = request.SpeakerId,
                    Rating = request.Rating,
                    Message = request.Message

                }, cancellationToken);


            }
        }
    }
}
