import { Account, AccountInterface, BigNumberish, Call } from "starknet";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { Direction, stringToFelt, updatePositionWithDirection } from "../utils";
import {
    getEntityIdFromKeys,
    getEvents,
    setComponentsFromEvents,
} from "@dojoengine/utils";
import { ContractComponents } from "./generated/contractComponents";
import type { IWorld } from "./generated/generated";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export type DojoCall = {
    contractName: string
    functionName: string
    callData: BigNumberish[]
  }
  

const lobby_call = (functionName: string, callData: any[]) => ({
    contractName: 'lobby',
    functionName,
    callData,
})

export function createSystemCalls(
    network: SetupNetworkResult,
    components: ClientComponents,
    manifest: any,
  ) {
    const { execute, executeMulti, call, contractComponents } = network

    const _executeTransaction = async (signer: AccountInterface, params: DojoCall | Call[]): Promise<boolean> => {
        let success = false
        try {
          let tx = null
          if (!Array.isArray(params)) {
            tx = await execute(signer, params.contractName, params.functionName, params.callData);
            console.log(`execute ${params.contractName}::${params.functionName}() tx:`, params.callData, tx)
          } else {
            tx = await executeMulti(signer, params)
            console.log(`executeMulti:`, params, ` tx:`, tx)
          }
    
          const receipt = await signer.waitForTransaction(tx.transaction_hash, { retryInterval: 200 })
          success = getReceiptStatus(receipt);
          (success ? console.log : console.warn)(`execute success:`, success, 'receipt:', receipt, 'params:', params)
    
          setComponentsFromEvents(contractComponents, getEvents(receipt));
        } catch (e) {
          console.warn(`execute exception:`, params, e)
        } finally {
        }
        return success
      }
    
    //   const _executeCall = async (params: DojoCall): Promise<any | null> => {
    //     let results = null
    //     try {
    //       const eventData = await call(params.contractName, params.functionName, params.callData)
    //       // console.log(eventData)
    //       // result = decodeComponent(contractComponents['Component'], eventData.result)
    //       results = eventData.result.map(v => BigInt(v))
    //       // console.log(`call ${system}(${args.length}) success:`, result)
    //     } catch (e) {
    //       console.warn(`call ${params.contractName}::${params.functionName}(${params.callData.length}) exception:`, e)
    //     } finally {
    //     }
    //     return results
    //   }
      
      const register_player = async (signer: AccountInterface, name: string): Promise<boolean> => {
        const args = [stringToFelt(name)]
        return await _executeTransaction(signer, lobby_call('register_player', args))
      }

      return {
        register_player
      }
  }

  function getReceiptStatus(receipt: any): boolean {
    if (receipt.execution_status != 'SUCCEEDED') {
      if (receipt.execution_status == 'REVERTED') {
        console.error(`Transaction reverted:`, receipt.revert_reason)
      } else {
        console.error(`Transaction error [${receipt.execution_status}]:`, receipt)
      }
    //   emitter.emit('transaction_error', {
    //     status: receipt.execution_status,
    //     reason: receipt.revert_reason,
    //   })
      return false
    }
    return true
  }
  
// export function createSystemCalls(
//     { client }: { client: IWorld },
//     contractComponents: ContractComponents,
//     { BlobertOne, BlobertTwo, BlobertThree, BlobertFour, BlobertFive, BlobertSix, Player }: ClientComponents
// ) {
//     const register_player = async (account: AccountInterface, name: string) => {
//         try {
//             const { transaction_hash } = await client.lobby.register_player({
//                 account, name
//             })
//             console.log(
//                 await account.waitForTransaction(transaction_hash, {
//                     retryInterval: 100,
//                 })
//             )

//             setComponentsFromEvents(
//                 contractComponents,
//                 getEvents(
//                     await account.waitForTransaction(transaction_hash, {
//                         retryInterval: 100,
//                     })
//                 )
//             );
//         }catch(e){
//             console.log(e);
//         } finally {
//         }
//     }
    // const spawn = async (account: AccountInterface) => {
    //     const entityId = getEntityIdFromKeys([
    //         BigInt(account.address),
    //     ]) as Entity;

    //     const positionId = uuid();
    //     Position.addOverride(positionId, {
    //         entity: entityId,
    //         value: { player: BigInt(entityId), vec: { x: 10, y: 10 } },
    //     });

    //     const movesId = uuid();
    //     Moves.addOverride(movesId, {
    //         entity: entityId,
    //         value: {
    //             player: BigInt(entityId),
    //             remaining: 100,
    //             last_direction: 0,
    //         },
    //     });

    //     try {
    //         const { transaction_hash } = await client.actions.spawn({
    //             account,
    //         });

    //         console.log(
    //             await account.waitForTransaction(transaction_hash, {
    //                 retryInterval: 100,
    //             })
    //         );

    //         setComponentsFromEvents(
    //             contractComponents,
    //             getEvents(
    //                 await account.waitForTransaction(transaction_hash, {
    //                     retryInterval: 100,
    //                 })
    //             )
    //         );
    //     } catch (e) {
    //         console.log(e);
    //         Position.removeOverride(positionId);
    //         Moves.removeOverride(movesId);
    //     } finally {
    //         Position.removeOverride(positionId);
    //         Moves.removeOverride(movesId);
    //     }
    // };

    // const move = async (account: AccountInterface, direction: Direction) => {
    //     const entityId = getEntityIdFromKeys([
    //         BigInt(account.address),
    //     ]) as Entity;

    //     const positionId = uuid();
    //     Position.addOverride(positionId, {
    //         entity: entityId,
    //         value: {
    //             player: BigInt(entityId),
    //             vec: updatePositionWithDirection(
    //                 direction,
    //                 getComponentValue(Position, entityId) as any
    //             ).vec,
    //         },
    //     });

    //     const movesId = uuid();
    //     Moves.addOverride(movesId, {
    //         entity: entityId,
    //         value: {
    //             player: BigInt(entityId),
    //             remaining:
    //                 (getComponentValue(Moves, entityId)?.remaining || 0) - 1,
    //         },
    //     });

    //     try {
    //         const { transaction_hash } = await client.actions.move({
    //             account,
    //             direction,
    //         });

    //         setComponentsFromEvents(
    //             contractComponents,
    //             getEvents(
    //                 await account.waitForTransaction(transaction_hash, {
    //                     retryInterval: 100,
    //                 })
    //             )
    //         );
    //     } catch (e) {
    //         console.log(e);
    //         Position.removeOverride(positionId);
    //         Moves.removeOverride(movesId);
    //     } finally {
    //         Position.removeOverride(positionId);
    //         Moves.removeOverride(movesId);
    //     }
    // };

//     return {
//         register_player
//         // spawn,
//         // move,
//     };
// }
