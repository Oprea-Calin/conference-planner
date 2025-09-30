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
    public class SaveConferenceHandler(IMessageBusPublisher messageBusPublisher, IConferenceRepository conferenceRepository) : IRequestHandler<SaveConference>
    {
        public async Task Handle(SaveConference request, CancellationToken cancellationToken)
        {
            Conference conference;
            var allSpeakers = await conferenceRepository.getAllSpeakers();

            //mapare dto -> entity
            if (request.Id == 0)
            {
                conference = new Conference
                {
                    Name = request.Name,
                    OrganizerEmail = request.OrganizerEmail,
                    StartDate = request.StartDate,
                    EndDate = request.EndDate,
                    ConferenceTypeId = request.ConferenceTypeId,
                    CategoryId = request.CategoryId,
                    LocationId = request.LocationId,
                    ConferenceXSpeakers = new List<ConferenceXSpeaker>()
                };
                if (request.LocationId == 0)
                {
                    conference.location = new Location()
                    {
                        CityId = request.Location.City.Id,
                        CountryId = request.Location.Country.Id,
                        CountyId = request.Location.County.Id,
                        Address = request.Location.Address,
                        Code = request.Location.Code,
                        Latitude = request.Location.Latitude,
                        Longitude = request.Location.Longitude,
                        Name = request.Location.Name
                    };
                }
                //adaugam sau cream speaker pentru conferinta creata
                //daca gasim un speaker cu numele din dto, il folosim, altfel cream unul nou

                foreach (var requestSpeaker in request.Speakers)
                {
                    ConferenceXSpeaker dbSpeaker = new ConferenceXSpeaker();
                    dbSpeaker.Speaker = new Common.Domain.Entities.Conference.Speaker();

                    if (requestSpeaker.SpeakerId != 0)
                    {
                        var existingSpeaker = allSpeakers.FirstOrDefault(s => s.Name == requestSpeaker.Name);
                        if (existingSpeaker != null)
                        {
                            dbSpeaker.Speaker = existingSpeaker;
                            dbSpeaker.SpeakerId = existingSpeaker.Id;
                        }
                    }
                    else
                    {
                        dbSpeaker.Speaker.Name = requestSpeaker.Name;
                        dbSpeaker.Speaker.Nationality = requestSpeaker.Nationality;
                        dbSpeaker.Speaker.Rating = requestSpeaker.Rating;
                        dbSpeaker.IsMainSpeaker = requestSpeaker.IsMainSpeaker;

                        conferenceRepository.AddSpeaker(dbSpeaker); //aici am adaugat legatura ConferenceXSpeaker
                    }
                }

                conferenceRepository.AddConference(conference);
            }
            else
            {
                conference = await conferenceRepository.GetConferenceById(request.Id) ?? throw new Exception($"Conference with id {request.Id} not found.");

                conference.Name = request.Name;
                conference.OrganizerEmail = request.OrganizerEmail;
                conference.StartDate = request.StartDate;
                conference.EndDate = request.EndDate;
                conference.LocationId = request.LocationId;
                conference.ConferenceTypeId = request.ConferenceTypeId;
                conference.CategoryId = request.CategoryId;
                conference.ConferenceXSpeakers = request.Speakers.Select(s => new ConferenceXSpeaker
                {
                    SpeakerId = s.SpeakerId,
                    IsMainSpeaker = s.IsMainSpeaker
                }).ToList();

                if (conference.LocationId == 0)
                {
                    conference.location = new Location()
                    {
                        CityId = request.Location.City.Id,
                        CountryId = request.Location.Country.Id,
                        CountyId = request.Location.County.Id,
                        Address = request.Location.Address,
                        Code = request.Location.Code,
                        Latitude = request.Location.Latitude,
                        Longitude = request.Location.Longitude,
                        Name = request.Location.Name
                    };
                }

                //for 
            }

            await conferenceRepository.Save();
            await messageBusPublisher.PublishAsync(new ConferenceSaved(conference.Id), cancellationToken);
        }
    }
}
