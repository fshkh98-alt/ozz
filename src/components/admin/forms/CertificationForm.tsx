import { inputClass, labelClass } from "@/lib/utils";
import type { Certification } from "@prisma/client";

function toInputDate(d?: Date | null) {
  return d ? d.toISOString().slice(0, 10) : "";
}

export function CertificationForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: Certification;
}) {
  return (
    <form action={action} className="max-w-lg space-y-4">
      <div>
        <label className={labelClass} htmlFor="name">Certificate name</label>
        <input id="name" name="name" required defaultValue={item?.name} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="issuer">Issuer</label>
        <input id="issuer" name="issuer" required defaultValue={item?.issuer} className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="issueDate">Issue date</label>
          <input id="issueDate" name="issueDate" type="date" required defaultValue={toInputDate(item?.issueDate)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="expirationDate">Expiration date</label>
          <input id="expirationDate" name="expirationDate" type="date" defaultValue={toInputDate(item?.expirationDate)} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="credentialId">Credential ID</label>
        <input id="credentialId" name="credentialId" defaultValue={item?.credentialId ?? ""} className={inputClass} />
      </div>
      <label className="flex items-center gap-2 text-sm text-text">
        <input type="checkbox" name="showCredentialId" defaultChecked={item?.showCredentialId ?? true} />
        Show credential ID publicly
      </label>
      <div>
        <label className={labelClass} htmlFor="credentialUrl">Credential URL</label>
        <input id="credentialUrl" name="credentialUrl" defaultValue={item?.credentialUrl ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="fileUrl">Certificate file/image URL</label>
        <input id="fileUrl" name="fileUrl" defaultValue={item?.fileUrl ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="description">Description</label>
        <textarea id="description" name="description" rows={3} defaultValue={item?.description ?? ""} className={inputClass} />
      </div>
      <button type="submit" className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg">
        Save
      </button>
    </form>
  );
}
