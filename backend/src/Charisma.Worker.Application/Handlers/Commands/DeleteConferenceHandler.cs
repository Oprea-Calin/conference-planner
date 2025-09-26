using Charisma.Common.Domain.Abstractions;
using Charisma.Common.Domain.Dtos.Commands;
using Charisma.Common.Domain.Dtos.Events;
using Charisma.Common.Domain.Entities.Conference;
using MediatR;
using NBB.Messaging.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Charisma.Worker.Application.Handlers.Commands
{
    public class DeleteConferenceHandler(IMessageBusPublisher messageBusPublisher, IConferenceRepository conferenceRepository) : IRequestHandler<DeleteConference> 
    {

        public async Task Handle(DeleteConference request, CancellationToken cancellationToken)
        {
            Conference conference;
            if (request.id == 0)
            {
               throw new ApplicationException($"Conference Id is 0.");

            }
            else
            {
                conference = await conferenceRepository.GetConferenceById(request.id)
                    ?? throw new ApplicationException($"Conference with Id {request.id} not found.");
                conferenceRepository.DeleteConference(conference);




            }


            await conferenceRepository.Save();
            await messageBusPublisher.PublishAsync(new ConferenceDeleted(conference.Id), cancellationToken);
        }
    }
}
