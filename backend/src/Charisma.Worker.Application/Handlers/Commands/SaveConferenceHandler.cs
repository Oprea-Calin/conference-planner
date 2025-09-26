using Charisma.Common.Domain.Abstractions;
using Charisma.Common.Domain.Dtos.Commands;
using Charisma.Common.Domain.Dtos.Events;
using Charisma.Common.Domain.Entities.Conference;
using MediatR;
using Microsoft.Extensions.Logging;
using NBB.Messaging.Abstractions;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Charisma.Worker.Application.Handlers.Commands
{
    public class SaveConferenceHandler(IMessageBusPublisher messageBusPublisher, IConferenceRepository conferenceRepository): IRequestHandler<SaveConference>
    {

        public async Task Handle(SaveConference request, CancellationToken cancellationToken)
        {
            Conference conference;
            if(request.Conference.Id == 0)
            {
                conference = new Conference
                {
                    Name = request.Conference.Name,
                    OrganizerEmail = request.Conference.OrganizerEmail,
                    StartDate = request.Conference.StartDate,
                    EndDate = request.Conference.EndDate,
                    ConferenceTypeId = request.Conference.ConferenceTypeId,
                    CategoryId = request.Conference.CategoryId,
                    LocationId = request.Conference.LocationId
                };
                if (conference.LocationId == 0)
                {
                    conference.location = new Location()
                    {
                        CityId = request.Conference.location.City.Id,
                        CountryId = request.Conference.location.Country.Id,
                        CountyId = request.Conference.location.County.Id,
                        Name = request.Conference.location.Name,
                        Code = request.Conference.location.Code,
                        Address = request.Conference.location.Address,
                        Latitude = request.Conference.location.Latitude,
                        Longitude = request.Conference.location.Longitude

                    };
                }
                conferenceRepository.AddConference(conference);
            }
            else
            {
                conference = await conferenceRepository.GetConferenceById(request.Conference.Id)
                    ?? throw new ApplicationException($"Conference with Id {request.Conference.Id} not found.");
                
                conference.Name = request.Conference.Name;
                conference.OrganizerEmail = request.Conference.OrganizerEmail;
                conference.StartDate = request.Conference.StartDate;
                conference.EndDate = request.Conference.EndDate;
                conference.ConferenceTypeId = request.Conference.ConferenceTypeId;
                conference.CategoryId = request.Conference.CategoryId;
                conference.LocationId = request.Conference.LocationId;

                if(conference.LocationId == 0)
                {
                    conference.location = new Location()
                    {
                        CityId = request.Conference.location.City.Id,
                        CountryId = request.Conference.location.Country.Id,
                        CountyId = request.Conference.location.County.Id,
                        Name = request.Conference.location.Name,
                        Code = request.Conference.location.Code,
                        Address = request.Conference.location.Address,
                        Latitude = request.Conference.location.Latitude,
                        Longitude = request.Conference.location.Longitude

                    };
                }

            }


            await conferenceRepository.Save();
            await messageBusPublisher.PublishAsync(new ConferenceSaved(conference.Id), cancellationToken);
        }
    }
}
