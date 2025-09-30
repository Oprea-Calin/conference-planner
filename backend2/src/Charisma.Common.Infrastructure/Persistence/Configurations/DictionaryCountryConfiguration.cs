using Charisma.Common.Domain.Entities.Dictionaries;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Charisma.Common.Infrastructure.Persistence.Configurations
{
    public class DictionaryCountryConfiguration : IEntityTypeConfiguration<DictionaryCountry>
    {
        public void Configure(EntityTypeBuilder<DictionaryCountry> builder)
        {
            builder.ToTable("DictionaryCountry");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();
            builder.Property(x => x.Name).HasMaxLength(200);
        }

    }

}
