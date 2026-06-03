# Firebase Firestore Security Specification

This document details the Zero-Trust security layout, data invariants, and defensive tests for the **Boutique App Design Studio** inquiries database on Cloud Firestore.

## 1. Data Invariants
- **Public-Only Submissions (No Auth Required for Creation)**: Users do not need an account to submit an app inquiry. However, they are granted **absolute write-once privilege**. Once submitted, inquiries cannot be read, updated, or deleted by any public user.
- **Strict Size Sanity Guards**: Fields are bounded by length constraints to prevent resource exhaustion and Denial-of-Wallet (DoW) attacks.
- **Strict Key Adherence**: Payloads containing untracked or "ghost" keys are immediately rejected.
- **Temporal Invariance**: The `id` matches a strict format, and `createdAt` matches standard length bounds.

---

## 2. The "Dirty Dozen" Malicious Payloads

The following payloads attempt to break the laws of Identity, Integrity, and State. Every payload in this spec must be rejected with `PERMISSION_DENIED`.

### Payload 1: Shadow Update / Ghost Fields (Privilege Escalation)
Attempting to inject a field to gain permissions or track custom variables.
```json
{
  "id": "KNL-1024",
  "name": "Attacker",
  "email": "attacker@gmail.com",
  "projectType": "native-app",
  "budget": "unspecified",
  "timeline": "unspecified",
  "description": "Exploit!",
  "createdAt": "2026-06-01T06:00:00Z",
  "isAdmin": true
}
```

### Payload 2: Massive String Overflow (Denial of Wallet / DoW)
Attempting to crash state or increase storage costs with a 1MB description string.
```json
{
  "id": "KNL-1025",
  "name": "Attacker",
  "email": "attacker@gmail.com",
  "projectType": "native-app",
  "budget": "unspecified",
  "timeline": "unspecified",
  "description": "...[1MB of noise]...",
  "createdAt": "2026-06-01T06:00:00Z"
}
```

### Payload 3: Missing Required Fields (Schema UndefinedState)
Omit standard budget details or name fields.
```json
{
  "id": "KNL-1026",
  "email": "attacker@gmail.com",
  "projectType": "native-app",
  "timeline": "unspecified",
  "description": "Where is my name?",
  "createdAt": "2026-06-01T06:00:00Z"
}
```

### Payload 4: Invalid Types / Type Poisoning
Providing budget as a boolean instead of a string.
```json
{
  "id": "KNL-1027",
  "name": "Attacker",
  "email": "attacker@gmail.com",
  "projectType": "native-app",
  "budget": true,
  "timeline": "unspecified",
  "description": "Boolean budget",
  "createdAt": "2026-06-01T06:00:00Z"
}
```

### Payload 5: Path Variable ID Poisoning
Injecting massive, malicious symbols into the URL document ID (e.g. `/inquiries/{inquiryId}`).
- **Attack ID**: `KNL-invalid_chars!!@#$*`

### Payload 6: Spoofed Public Read Request
Attempting to read back all user inquiries from the client.
- **Operation**: `list` on `/inquiries`

### Payload 7: Targeted Public Get Request
Attempting to read back a specific user's inquiry from the client.
- **Operation**: `get` on `/inquiries/KNL-1001`

### Payload 8: Malicious Update Request
Attempting to override or append to a previously submitted inquiry.
- **Operation**: `update` on `/inquiries/KNL-1001`

### Payload 9: Malicious Delete Request
Attempting to delete a previously submitted inquiry.
- **Operation**: `delete` on `/inquiries/KNL-1001`

### Payload 10: Empty ID Injection
Document ID format mismatch.
```json
{
  "id": "",
  "name": "Attacker",
  "email": "attacker@gmail.com",
  "projectType": "native-app",
  "budget": "unspecified",
  "timeline": "unspecified",
  "description": "Empty ID",
  "createdAt": "2026-06-01T06:00:00Z"
}
```

### Payload 11: Empty/Zero-length Email Payload
```json
{
  "id": "KNL-1028",
  "name": "Attacker",
  "email": "",
  "projectType": "native-app",
  "budget": "unspecified",
  "timeline": "unspecified",
  "description": "Empty email line",
  "createdAt": "2026-06-01T06:00:00Z"
}
```

### Payload 12: Empty Description Payload
```json
{
  "id": "KNL-1029",
  "name": "Attacker",
  "email": "attacker@gmail.com",
  "projectType": "native-app",
  "budget": "unspecified",
  "timeline": "unspecified",
  "description": "",
  "createdAt": "2026-06-01T06:00:00Z"
}
```

---

## 4. Testimonials database
- **Public reads allowed**: Testimonials are public reviews, hence readable by everyone.
- **Write-once creation (no auth required for submission, or admin only)**: If clients submit reviews, they are checked against strict schema bounds. Update/delete are blocked.
- **Schema Validations**: Testimonial `id` must be valid, field types strictly verified, and string lengths under strict limits (descriptions/comments under 1000 chars, rating is an integer between 1 and 5).
