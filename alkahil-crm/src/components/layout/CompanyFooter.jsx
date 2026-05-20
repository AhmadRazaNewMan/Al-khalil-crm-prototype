import { companyInfo } from '../../data/dummyData'

/** TechKhwa Solutions vendor block — proposal footer details */
export default function CompanyFooter({ variant = 'light', compact = false }) {
  const { legalName, website, websiteAlt, phone, email, address } = companyInfo
  const isDark = variant === 'dark'
  const text = isDark ? 'rgba(255,255,255,0.75)' : '#666'
  const muted = isDark ? 'rgba(255,255,255,0.5)' : '#999'
  const link = isDark ? 'rgba(255,255,255,0.9)' : '#C8A75B'

  const fullAddress = `${address.line1}, ${address.line2}, ${address.postal}, ${address.region}, ${address.country}`

  if (compact) {
    return (
      <div style={{ fontSize: 11, color: muted, lineHeight: 1.5, textAlign: 'center' }}>
        <span style={{ color: text, fontWeight: 600 }}>{legalName}</span>
        {' · '}
        <a href={website} target="_blank" rel="noreferrer" style={{ color: link, textDecoration: 'none' }}>
          techkhwasolutions.com
        </a>
      </div>
    )
  }

  return (
    <div
      style={{
        fontSize: 11,
        color: text,
        lineHeight: 1.65,
        borderTop: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB',
        paddingTop: 16,
        marginTop: 20,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 12, color: isDark ? '#fff' : '#111', marginBottom: 6 }}>
        {legalName}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', marginBottom: 6 }}>
        <a href={website} target="_blank" rel="noreferrer" style={{ color: link, textDecoration: 'none' }}>
          techkhwasolutions.com
        </a>
        <a href={websiteAlt} target="_blank" rel="noreferrer" style={{ color: link, textDecoration: 'none' }}>
          techkhwa.com
        </a>
        <span>{phone}</span>
        <a href={`mailto:${email}`} style={{ color: link, textDecoration: 'none' }}>{email}</a>
      </div>
      <div style={{ color: muted, maxWidth: 420 }}>{fullAddress}</div>
    </div>
  )
}
