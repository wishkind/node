/* eslint-disable max-len */
import React, { useState } from "react";
import { downloadFileFromIPFS, isDecryptionFailed, saveHashToRemote } from "src/utils/file";
import { useBSSession } from "src/stores/BlockstackSessionStore";
import { Label, Input } from "reactstrap";
import { CertList } from "./CertList";
import { useRefreshToken } from "src/utils/useRefreshToken";
import { PageLoading } from "src/components/PageLoading";

export const DownloadCert: React.FC = () => {

  const [preparingDownloading, setPreparaingDownload] = useState(false);
  const [refreshtToken, refresh] = useRefreshToken();

  const { session } = useBSSession();
  const [hash, setHash] = useState("");
  const [save, setSave] = useState(false);

  const downloadFile = async () => {
    setPreparaingDownload(true);
    try {
      const cert = await downloadFileFromIPFS(hash, session.loadUserData().appPrivateKey);

      // if the user requests to save, try saving
      if (save) {
        await saveHashToRemote(session, cert);
        refresh();
      }

    } catch (e) {
      console.error(e);
      if (isDecryptionFailed(e)) {
        alert("解密文件失败。此文件可能不属于您！");
      }
    } finally {
      setPreparaingDownload(false);
    }
  };

  return (
    <PageLoading show={preparingDownloading}>

      <div className="ipfs">
        <div className="ipfscentre">
          <div className="ipfsleft">
            <p className="ipfstitle">
            证书原件下载
            </p>
            <p className="ipfsexplain">
            本系统中所有的证书在颁发时均使用用户的公钥加密并上传至IPFS系统，并将其哈希值随pdf文件一并发送至证书持有者邮箱。
            </p>
            <p className="ipfsexplain">
            若证书丢失或损毁，在右侧输入证书的哈希值即可在IPFS平台下载证书原件，并将自动使用用户的私钥进行解密。
            </p>
          </div>
          <div className="ipfsright">
            <p><strong>账号已经保存的证书（点击下载）</strong></p>
            <CertList refreshToken={refreshtToken} setPreparingDownload={setPreparaingDownload} />
            <input
              type="text" name="hash" value={hash} onChange={(e) => setHash(e.target.value)}
              className="number" placeholder="输入证书hash值"
            />
            <button className="ok" type="submit" onClick={downloadFile}>下载</button>
            <Label check>
              <Input type="checkbox" id="save" checked={save} onChange={(e) => setSave(e.target.checked)}/>
              保存证书到自己的账号里
            </Label>
          </div>
        </div>
      </div>
    </PageLoading>
  );
};
